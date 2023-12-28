<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Streamlit } from 'streamlit-component-lib'

import { useStreamlit } from '../streamlit'
import type { ComponentProps } from '../types/ComponentProps'

useStreamlit()

const props = defineProps<
	ComponentProps<{
		name?: string
	}>
>()

// Default props values
watch(() => props.args, () =>
	{
		props.args.name ||= 'World'
	},
	{ deep: true, immediate: true },
)

const numClicks = ref(0)
const isFocused = ref(false)

const style = reactive<{ [key: string]: string }>({})

if (props.theme)
{
	style['--base'] = props.theme.base
	style['--primary-color'] = props.theme.primaryColor
	style['--background-color'] = props.theme.backgroundColor
	style['--secondary-background-color'] = props.theme.secondaryBackgroundColor
	style['--text-color'] = props.theme.textColor
	style['--font'] = props.theme.font
}

const onClicked = () =>
	{
		numClicks.value++
		Streamlit.setComponentValue(numClicks.value)
	}

const onFocus = () =>
	{
		isFocused.value = true
	}

const onBlur = () =>
	{
		isFocused.value = false
	}

</script>

<template>
	<div class="component" :style="style">
		Hello, {{ props.args.name }}! &nbsp;
		<button
			@click="onClicked"
			:disabled="props.disabled"
			@focus="onFocus"
			@blur="onBlur"
		>
			Click Me!
		</button>
	</div>
</template>

<style scoped>
	.component {
		background-color: var(--secondary-background-color);
		padding: .5em;
		box-sizing: border-box;
		color: var(--text-color);
		font-family: var(--font);
		border-radius: .5em;
	}
</style>
