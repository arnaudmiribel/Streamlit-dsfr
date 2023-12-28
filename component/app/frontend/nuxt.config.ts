// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src',
	css: [
		'@gouvfr/dsfr/dist/dsfr.min.css',
		'@gouvminint/vue-dsfr/styles',
	],
  	devtools: {
		enabled: false,
	},
	vite: {
		server: {
			watch: {
				usePolling: true,
			},
		},
	},
})
