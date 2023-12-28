<script setup>
import StreamlitComponent from '~/components/StreamlitComponent.vue'
import Component from '~/components/MyComponent.vue'
</script>

<template>
	<StreamlitComponent :component="Component" client:load />
</template>
