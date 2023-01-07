import { useRouter } from "next/router"
import * as React from "react"

import toTitleCase from "../../utils/toTitleCase.util"
import Props from "./Location.types"

const Location = ({ className }: Props) => {
  const router = useRouter()

  const path = router.pathname.slice(0, -1).replaceAll("/", " > ").replaceAll("-", " ")
  const Titlepath = toTitleCase(path)

  return <span> {`Home ${Titlepath}`} </span>
}

export default Location
