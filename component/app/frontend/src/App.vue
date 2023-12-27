<script setup lang="ts">
import DsfrButton from './components/DsfrButton.vue'
import WithStreamlitConnection from './streamlit/WithStreamlitConnection.vue'
</script>

<template>
	<main>
		<WithStreamlitConnection v-slot="{ width, args, disabled, theme }">
			<DsfrButton :width="width" :args="args" :disabled="disabled" :theme="theme" />
		</WithStreamlitConnection>
	</main>
</template>

<style>
body {
	margin: 0;
}
</style>

<style scoped>
main {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
