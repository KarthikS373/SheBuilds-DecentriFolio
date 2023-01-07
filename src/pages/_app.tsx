import { type AppProps } from "next/app"
import React from "react"
import { Toaster } from "react-hot-toast"

import "../styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
