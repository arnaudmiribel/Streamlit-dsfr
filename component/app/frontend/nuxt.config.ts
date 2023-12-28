// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: './src',
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
