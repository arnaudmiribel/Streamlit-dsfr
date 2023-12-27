<script setup lang="ts">
import MyComponent from './components/MyComponent.vue'
import WithStreamlitConnection from './streamlit/WithStreamlitConnection.vue'
</script>

<template>
	<main>
		<WithStreamlitConnection v-slot="{ args }">
			<!-- @vue-ignore '{ args: any; }' is missing the following properties from type -->
			<MyComponent :args="args" />
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
