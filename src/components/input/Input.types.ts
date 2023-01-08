import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  beginningIcon?: React.ReactNode
  required?: boolean
  endIcon?: React.ReactNode
  disabled?: boolean
  value?: any
  defaultValue?: any
  min?: any
  accept?: string
}

export default Props
