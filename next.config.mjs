import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { createMDX } from "fumadocs-mdx/next";
import { transformerTwoslash } from "fumadocs-twoslash";

const withMDX = createMDX({
	mdxOptions: {
		rehypeCodeOptions: {
			transformers: [
				...rehypeCodeDefaultOptions.transformers,
				transformerTwoslash(),
			],
		},
	},
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
};

export default withMDX(config);
