#!/usr/bin/env node

import { tomd } from "./index.mts";

const [maybeUrl] = process.argv.slice(2);

tomd(maybeUrl)
	.then((content) => {
		if (content) process.stdout.write(content);
	})
	.catch((err) => {
		if (err instanceof Error) {
			process.stderr.write(err?.message);
		}
	});
