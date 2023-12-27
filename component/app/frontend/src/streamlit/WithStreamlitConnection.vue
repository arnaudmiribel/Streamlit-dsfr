<script setup lang="ts">
import { ref, onMounted, onUpdated, onUnmounted, onErrorCaptured } from 'vue'
import { Streamlit, type RenderData } from 'streamlit-component-lib'

const renderData = ref<RenderData>((undefined as unknown) as RenderData)
const componentError = ref("")

const onRenderEvent = (event: Event): void =>
	{
		const renderEvent = event as CustomEvent<RenderData>
		renderData.value = renderEvent.detail
		componentError.value = ''
	}

onMounted(() =>
	{
		Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRenderEvent)
		Streamlit.setComponentReady()
	})

onUpdated(() =>
	{
		if (componentError.value != "")
		{
			Streamlit.setFrameHeight()
		}
	})

onUnmounted(() =>
	{
		Streamlit.events.removeEventListener(Streamlit.RENDER_EVENT, onRenderEvent)
	})

onErrorCaptured(err =>
	{
		componentError.value = String(err)
	})
</script>

<template>
	<div>
		<div v-if="componentError != ''">
			<h1 class="err__title">Component Error</h1>
			<div class="err__msg">Message: {{ componentError }}</div>
		</div>
		<slot
			v-else-if="renderData != null"
			:args="renderData.args"
			:disabled="renderData.disabled"
		></slot>
	</div>
</template>

<style scoped>
.err__title,
.err__msg {
  	margin: 0;
}
</style>
