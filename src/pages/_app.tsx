import { ethers } from "ethers"
import { type AppProps } from "next/app"
import React from "react"
import { Toaster } from "react-hot-toast"

import { Web3Provider } from "@ethersproject/providers"
import { AbstractConnector } from "@web3-react/abstract-connector"
import { Web3ReactProvider } from "@web3-react/core"

import "../styles/globals.css"
import { handleConnect } from "../utils/metamask.connect"

const getLibrary = (provider?: any, connector?: AbstractConnector | undefined) => {
  return new Web3Provider(provider)
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div>
          <Toaster />
        </div>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
