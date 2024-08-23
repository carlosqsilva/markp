import path from "node:path";
import esbuild from "esbuild";
import fs from "node:fs";

function emptyDir(dir: string) {
	let items = [];
	try {
		items = fs.readdirSync(dir);
	} catch {
		return fs.mkdirSync(dir);
	}

	for (const item of items) {
		fs.rmSync(path.join(dir, item), { recursive: true, force: true });
	}
}

const outputDir = path.resolve(__dirname, "./dist");
console.log(`Cleaning Output Dir: ${outputDir}`);
emptyDir(outputDir);

const { peerDependencies, devDependencies } = require("./package.json");
const externalPackages = Object.keys({
	...peerDependencies,
	...devDependencies,
});

(async () => {
	const codeResult = await esbuild.build({
		minify: true,
		bundle: true,
		keepNames: true,
		metafile: true,
		outfile: path.resolve(__dirname, "./dist/markp.js"),
		format: "cjs",
		platform: "node",
		target: "esnext",
		entryPoints: ["./index.ts"],
		external: externalPackages,
	});

	const outputs = codeResult?.metafile?.outputs ?? {};
	for (const fileName of Object.keys(outputs)) {
		const fileSize = outputs[fileName].bytes / 1000;
		console.log(`${fileName} => ${fileSize} Kb`);
	}
})();
