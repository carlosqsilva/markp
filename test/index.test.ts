import { test, expect } from "vitest";
import { extractGithubContent, parseGithubURL, markp } from "../index";

test("Should parse Github URL", () => {
	const items = [
		{
			url: "https://github.com/carlosqsilva/newsletter-scraper",
			repo: "carlosqsilva/newsletter-scraper",
			path: null,
		},
		{
			url: "https://github.com/carlosqsilva/markp/blob/main/esbuild.ts",
			repo: "carlosqsilva/markp",
			path: "main/esbuild.ts",
		},
	];
	for (const item of items) {
		expect(parseGithubURL(item.url)).toStrictEqual({
			repo: item.repo,
			path: item.path,
		});
	}
});

test("Should extract github readme file", async () => {
	const repoURL = "https://github.com/carlosqsilva/markp";
	const result = await extractGithubContent(repoURL);
	expect(result).toHaveProperty("success", true);
	expect(result).toHaveProperty("md", "# test");
});

test("Should extract github source file", async () => {
	const repoURL = "https://github.com/carlosqsilva/markp/blob/main/index.ts";
	const result = await extractGithubContent(repoURL);
	expect(result).toHaveProperty("success", true);
	expect(result).toHaveProperty("md", "```ts\n# test\n```");
});

test("Should return nothing on invalid URL", async () => {
	await expect(markp("invalid")).resolves.toBe(undefined);
});

test("Should return nothing on empty page content", async () => {
	await expect(markp("http://empty.com")).resolves.toBe(undefined);
});

test("Should include page title", async () => {
	await expect(markp("http://content.com")).resolves.toBe("# title\n\ncontent");
});
