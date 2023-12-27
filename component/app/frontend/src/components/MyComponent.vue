<script setup lang="ts">
import { ref } from 'vue'
import { Streamlit, type Theme } from 'streamlit-component-lib'
import { useStreamlit } from '../streamlit'

useStreamlit()

interface ComponentProps<ArgType = any>
{
    args?: ArgType
    width: number
    disabled: boolean
    theme?: Theme
}

const props = defineProps<
	ComponentProps<{
		name?: string
	}>
>()

const numClicks = ref(0)
const isFocused = ref(false)

const style = reactive<{ [key: string]: string }>({})

if (props.theme)
{
	const borderStyling = `1px solid ${isFocused ? props.theme.primaryColor : 'gray'}`
	style.border = borderStyling
	style.outline = borderStyling
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
	<span>
		Hello, {{ props.args.name }}! &nbsp;
		<button
			:style="style"
			@click="onClicked"
			:disabled="props.disabled || undefined"
			@focus="onFocus"
			@blur="onBlur"
		>
			Click Me!
		</button>
	</span>
</template>
