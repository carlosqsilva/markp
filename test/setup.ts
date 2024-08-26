import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

const handlers = [
	http.get("https://api.github.com/repos/carlosqsilva/markp", () => {
		return HttpResponse.json({ default_branch: "main" });
	}),
	http.get(
		"https://raw.githubusercontent.com/carlosqsilva/markp/main/index.ts",
		() => {
			return HttpResponse.text("# test");
		},
	),
	http.get(
		"https://raw.githubusercontent.com/carlosqsilva/markp/main/README.md",
		() => {
			return HttpResponse.text("# test");
		},
	),
	http.get("http://empty.com", () => {
		return HttpResponse.text("");
	}),
	http.get("http://content.com", () => {
		return HttpResponse.text(`
			<html lang="en">
				<head>
					<title>title</title>
				</head>
				<body>
					<main>content</main>
				</body>
			</html>
		`);
	}),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
