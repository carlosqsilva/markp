import { Readability } from "@mozilla/readability";
import { Browser } from "happy-dom";
import ky from "ky";
import TurndownService from "turndown";
import * as v from "valibot";

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

	await page.goto(url);

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

export function parseGithubURL(url: string): {
	repo: string | null;
	path: string | null;
} {
	const { repo = null } =
		/^https:\/\/github\.com\/(?<repo>[\w-\.]+\/[\w-\.]+)/.exec(url)?.groups ??
		{};

	const { path = null } =
		/\/blob\/(?<path>.+\.[a-z]+)$/.exec(url)?.groups ?? {};

	return { repo, path };
}

export async function extractGithubContent(
	url: string,
): Promise<string | null> {
	const { path, repo } = parseGithubURL(url);

	if (defined(path) && defined(repo)) {
		const fileExtension = path.split(".").at(-1);
		const file = await ky
			.get(`https://raw.githubusercontent.com/${repo}/${path}`)
			.text();

		if (fileExtension?.toLowerCase() === "md") {
			return file;
		}

		return `\`\`\`${fileExtension}\n${file}\n\`\`\``;
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
			throw new Error(`Failed to get default branch for repo: ${repo}`);
		}

		const readmeFile = await ky
			.get(
				`https://raw.githubusercontent.com/${repo}/${success && output.default_branch}/README.md`,
			)
			.text();

		return readmeFile;
	}

	return null;
}

const validateUrlSchema = v.pipe(
	v.string(),
	v.transform((str) => str.trim()),
	v.url("Invalid URL"),
);

export async function tomd(urlStr: string): Promise<string> {
	const url = v.parse(validateUrlSchema, urlStr);

	// special handling for github URLs
	if (url.startsWith("https://github.com/")) {
		const content = await extractGithubContent(url);
		if (defined(content)) return content;
	}

	const document = await getDocument(url);
	const article = extractPageContent(document as unknown as Document);
	const turndown = new TurndownService();

	if (!defined(article?.content) || article.content === "") {
		throw new Error("Failed to extract page content");
	}

	let markdown = turndown.turndown(article.content);

	if (defined(article.title)) {
		markdown = `# ${article.title}\n\n${markdown}`;
	}

	return markdown;
}
