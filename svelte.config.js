import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			// prependData: `@import './src/scss/app.scss';`
		}
	}),
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
          // these are the aliases and paths to them
					'$stores': path.resolve('./src/stores')
				}
			}
		}
	},
};

export default config;
