import preprocess from 'svelte-preprocess';
import adapter from "@sveltejs/adapter-node";
import dotenv from "dotenv"
dotenv.config()

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true,
            replace: [
                [
                    ["process.env.BASE_URL", process.env.BASE_URL]
                ]
            ],
        }),
    ],
    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
        adapter: adapter({ out: 'public' }),
        vite: {
            define: {
                'process.env': process.env
            }
        }
    }
};

export default config;