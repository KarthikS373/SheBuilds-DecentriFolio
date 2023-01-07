import React, { MouseEventHandler } from "react"

import Props from "./Button.types"

const Button = ({
  content,
  className,
  beginningIcon,
  endIcon,
  type,
  onClick,
  children,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      className={` ${className} hover:brightness-90 flex items-center transition`}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {beginningIcon}
        {children}
        {endIcon}
      </>
    </button>
  )
}

export default Button
