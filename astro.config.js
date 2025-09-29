import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkCustomHeaderId from 'remark-custom-header-id';
import tailwindcss from '@tailwindcss/vite';
// Comment: import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: 'https://ajaygtm.github.io',
	srcDir: './source',
	output: 'static',
	trailingSlash: 'never',
	build: {
		format: 'file',
	},
	redirects: {
		'/thanks': '/supporters',
		'/lock-screen-one': '/any-text',
	},
	integrations: [
		sitemap(),
	],
	markdown: {
		remarkPlugins: [
			remarkCustomHeaderId,
		],
		// NOTE: If you re-enable autolink headings later, add rehype plugins here.
		// rehypePlugins: [
		// 	rehypeHeadingIds,
		// 	[rehypeAutolinkHeadings, {behavior: 'wrap'}],
		// ]
	},
	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './source'),
			},
		},
		plugins: [
			tailwindcss(),
		],
	},
	legacy: {
		// NOTE: Using legacy collections flag until migration to new content collections is done.
		collections: true,
	},
});
