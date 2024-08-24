#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { Browser } from "happy-dom";
import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";
import * as v from "valibot";
import ky from "ky";

function defined<T>(item: T): item is Exclude<T, null | undefined> {
	return item !== undefined && item !== null;
}

async function getDocument(url: string) {
	const browser = new Browser({
		settings: {
			disableCSSFileLoading: true,
		},
	});

	const page = browser.newPage();

	try {
		await page.goto(url);
	} catch (e) {
		console.error(`Failed to fetch: ${url}`);
		process.exit(1);
	}

	const document = page.mainFrame.document.cloneNode(true);

	page.close();
	browser.close();

	return document;
}

function extractPageContent(document: Document) {
	const nodes = ["scrips", "style", "iframe", "noscript"] as const;
	for (const node of nodes) {
		for (const item of document.querySelectorAll(node)) {
			item.remove();
		}
	}

	const reader = new Readability(document as unknown as Document, {
		charThreshold: 0,
		keepClasses: true,
		nbTopCandidates: 500,
	});

	return reader.parse();
}

async function extractGithubContent(url: string) {
	const { repo } =
		/^https:\/\/github\.com\/(?<repo>[a-z0-9.]+\/[a-z0-9.]+)/.exec(url)
			?.groups ?? {};

	const { path } = /\/blob\/(?<path>.+\.[a-z]+)$/.exec(url)?.groups ?? {};

	if (defined(path) && defined(repo)) {
		const fileExtension = path.split(".").at(-1);
		const file = await ky
			.get(`https://raw.githubusercontent.com/${repo}/${path}`)
			.text();

		if (fileExtension?.toLowerCase() === "md") {
			return {
				success: true,
				md: file,
			};
		}

		return {
			success: true,
			md: `\`\`\`${fileExtension}\n${file}\n\`\`\``,
		};
	}

	if (defined(repo)) {
		const response = await ky
			.get(`https://api.github.com/repos/${repo}`)
			.json();

		const { success, output } = v.safeParse(
			v.object({ default_branch: v.string() }),
			response,
		);

		if (!success) {
			console.error(`Failed to get default branch for repo: ${repo}`);
			process.exitCode = 1;
		}

		const readmeFile = await ky
			.get(
				`https://raw.githubusercontent.com/${repo}/${success && output.default_branch}/README.md`,
			)
			.text();

		return {
			success: true,
			md: readmeFile,
		};
	}

	return { success: false };
}

const validateUrlSchema = v.pipe(
	v.string(),
	v.transform((str) => str.trim()),
	v.url("Invalid URL"),
);

async function markp(urlStr: string) {
	const result = v.safeParse(validateUrlSchema, urlStr);

	if (!result.success) {
		const [issue] = result.issues;
		console.error(issue.message);
		process.exitCode = 1;
		return;
	}

	const url = result.output;

	// special handling for github URLs
	if (url.startsWith("https://github.com/")) {
		const { success, md } = await extractGithubContent(url);
		if (success) return md;
	}

	const document = await getDocument(url);
	const article = extractPageContent(document as unknown as Document);
	const turndown = new TurndownService();

	if (!defined(article?.content) || article.content === "") {
		console.error("Failed to extract page content");
		process.exitCode = 1;
		return;
	}

	let markdown = turndown.turndown(article.content);

	if (defined(article.title)) {
		markdown = `# ${article.title}\n\n${markdown}`;
	}

	return markdown;
}

const [maybeUrl] = process.argv.slice(2);
markp(maybeUrl).then((content) => {
	if (content) writeFileSync(1, content);
});
