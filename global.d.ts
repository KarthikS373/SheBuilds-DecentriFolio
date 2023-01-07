import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

declare module "*.mp4" {
  const src: string
  export default src
}
