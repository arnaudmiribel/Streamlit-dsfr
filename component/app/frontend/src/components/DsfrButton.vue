<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { Streamlit, type Theme } from 'streamlit-component-lib'
import { DsfrButton } from '@gouvminint/vue-dsfr'

import { useStreamlit } from '../streamlit'

useStreamlit()

interface ComponentProps<ArgType = any>
{
    args: ArgType
    width: number
    disabled: boolean
    theme?: Theme
}

const props = defineProps<
	ComponentProps<{
		label?: string | undefined
		secondary?: boolean
		tertiary?: boolean
		disabled?: boolean
		icon?: string | undefined
		iconOnly?: boolean
		iconRight?: boolean
		noOutline?: boolean
		size?: '' | 'small' | 'sm' | 'lg' | 'large' | 'md' | 'medium'
	}>
>()

// Default props values
watch(() => props.args, () =>
	{
		props.args.label ||= 'Button'
		props.args.secondary ??= false
		props.args.tertiary ??= false
		props.args.disabled ??= false
		props.args.iconOnly ??= false
		props.args.iconRight ??= false
		props.args.noOutline ??= false
		props.args.size ??= ''
	},
	{ deep: true, immediate: true },
)

const clicked = ref(false)
const isFocused = ref(false)

const onRenderEvent = (_event: Event): void =>
	{
		if (!isFocused.value && clicked.value)
		{
			clicked.value = false
			Streamlit.setComponentValue(clicked.value)
		}
	}

onMounted(() =>
	{
		Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRenderEvent)
		Streamlit.setComponentReady()
	})

onUnmounted(() =>
	{
		Streamlit.events.removeEventListener(Streamlit.RENDER_EVENT, onRenderEvent)
	})

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

const onClick = () =>
	{
		if (!clicked.value)
		{
			clicked.value = true
			Streamlit.setComponentValue(clicked.value)
		}
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
		<DsfrButton
			:label="props.args.label"
			:secondary="props.args.secondary"
			:tertiary="props.args.tertiary"
			:disabled="props.args.disabled"
			:icon="props.args.icon"
			:size="props.args.size"
			:no-outline="props.args.noOutline"
			:icon-only="props.args.iconOnly"
			:icon-right="props.args.iconRight"
			@click="onClick"
			@focus="onFocus"
			@blur="onBlur"
		/>
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
