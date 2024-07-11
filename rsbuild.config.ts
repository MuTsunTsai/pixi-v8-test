import { defineConfig } from "@rsbuild/core";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    html: {
        title: "Pixi v8 Graphics Test"
    },
	output: {
		cleanDistPath: isProduction,
        assetPrefix: "/pixi-v8-test/",
        polyfill: "off",
        distPath: {
			root: "docs",
		},
	}
});
