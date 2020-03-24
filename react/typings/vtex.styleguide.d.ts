/* eslint-disable import/order */

import * as Styleguide from 'vtex.styleguide'

declare module 'vtex.styleguide' {
  import * as React from 'react'

  export type InputProps = {
    label?: string | React.ReactElement
    error?: boolean
    errorMessage?: string
    helpText?: React.ReactNode
    suffix?: React.ReactNode
    prefix?: React.ReactNode
    isLoadingButton?: boolean
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>

  export const Input: React.FC<InputProps>
}
