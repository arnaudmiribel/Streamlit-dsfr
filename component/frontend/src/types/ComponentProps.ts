import type { ComponentProps as StreamlitComponentProps, Theme } from 'streamlit-component-lib'

interface ComponentProps<ArgType = any> extends StreamlitComponentProps
{
    args: ArgType
}

export type { ComponentProps }
