import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

const POLLING_INTERVAL = 10000

export const injected = new InjectedConnector({
  supportedChainIds: [1, 137],
})

export const walletconnect = new WalletConnectConnector({
  rpc: {},
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})
