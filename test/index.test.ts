import { test, expect } from "vitest";
import { extractGithubContent, parseGithubURL, tomd } from "../index.mts";

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

test("Should include page title", async () => {
	await expect(tomd("http://content.com")).resolves.toBe("# title\n\ncontent");
});

test("Should return nothing on invalid URL", async () => {
	await expect(tomd("invalid")).rejects.toThrowError();
});

test("Should return nothing on empty page content", async () => {
	await expect(tomd("http://empty.com")).rejects.toThrowError();
});
