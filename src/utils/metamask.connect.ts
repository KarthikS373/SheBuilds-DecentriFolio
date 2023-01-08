import { Web3Provider } from "@ethersproject/providers"
import { InjectedConnector } from "@web3-react/injected-connector"
import { ethers } from "ethers"

export const injectedProvider = new InjectedConnector({ supportedChainIds: [80001] })

export const handleConnect = async (connector: any) => {
  // read-only
  let ethersProvider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_POLYGON_MUMBAI_ALCHEMY_RPC_URL
  )
  let { provider } = await connector.activate()
  // signer
  const signer = provider.getSigner()
  ethersProvider = new Web3Provider(signer)
}
