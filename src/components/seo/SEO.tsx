import { ForwardedRef, forwardRef } from "react"

import styles from "./SEO.module.scss"
import Props from "./SEO.types"

const classes = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

const SEO = forwardRef(
  (
    { className, showOnFocus, as: Component = "span", children, visible, ...rest }: Props,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    return (
      <span
        className={classes(styles.hidden, className)}
        data-hidden={!visible && !showOnFocus}
        data-show-on-focus={showOnFocus}
        ref={ref}
        {...rest}
      >
        {children}
      </span>
    )
  }
)

export default SEO
