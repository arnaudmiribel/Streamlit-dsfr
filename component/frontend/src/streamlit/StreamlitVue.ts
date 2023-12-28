import { onMounted, onUpdated } from 'vue'
import { Streamlit } from 'streamlit-component-lib'

export function useStreamlit()
{
	onMounted((): void =>
		{
			Streamlit.setFrameHeight()
		})

	onUpdated((): void =>
		{
			Streamlit.setFrameHeight()
		})
}
