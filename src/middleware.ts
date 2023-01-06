import { getCookie } from "cookies-next"
import { NextRequest, NextResponse } from "next/server"

import { isAuth } from "./utils/isAuth.util"

const middleware = async (req: NextRequest, res: NextResponse) => {
  const protectedPath = [""]
  const authPath = [""]

  const { next, redirect } = NextResponse

  const cookie = req.cookies.get("auth")

  const auth = isAuth(cookie)

  next()
}

export default middleware
