import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  content?: string
  className?: string
  beginningIcon?: React.ReactNode
  endIcon?: React.ReactNode
  disabled?: boolean
}

export default Props
