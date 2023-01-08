import { ethers } from "ethers"
import React from "react"
import Button from "../../components/button/Button"
import AppLayout from "../../components/layout/AppLayout"
import { StaticImageData } from "next/image"
import toast from "react-hot-toast"

import WalletLogo from "../../assets/image/wallets"

const PaymentMethod = () => {
  const [defaultAccount, setDefaultAccount] = React.useState("")
  const [userBalance, setUserBalance] = React.useState("")

  const initializeMetamask = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((result: any[]) => {
          accountChangedHandler(result[0])
          console.log(result[0])
        })
        .catch((err: any) => {
          console.log(err)
        })
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img className="h-12 w-12 rounded-full" src={WalletLogo.MetaMask.src} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Metamask</p>
                <p className="mt-1 text-sm text-gray-500">
                  Please Install Metamask or choose any other wallet to try again
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))
    }
  }

  const accountChangedHandler = (newAccount: React.SetStateAction<string>) => {
    setDefaultAccount(newAccount)
    getUserBalance(newAccount)
  }

  const getUserBalance = (address: React.SetStateAction<string>) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance: React.SetStateAction<any>) => {
        setUserBalance(ethers.utils.formatEther(balance))
      })
  }

  const renderPayment = (wallet: string, img: StaticImageData) => (
    <Button
      content=""
      type="button"
      className="flex w-full flex-col items-center rounded-3xl border border-primary bg-white p-5 text-black md:flex-row"
      onClick={wallet.toLowerCase() === "metamask" ? initializeMetamask : undefined}
    >
      <div className="d:mb-0 mb-6">
        <img src={img.src} className="w-[50px]" />
      </div>
      <p className="-mt-[5px] font-semibold md:ml-5">Connect {wallet} wallet</p>
    </Button>
  )

  return (
    <AppLayout>
      <div className=" flex min-h-screen flex-col items-center bg-primary p-5 py-16 text-white">
        <form className="mt-20 rounded-xl bg-white py-5 px-20">
          <h1 className="text-center font-poppins font-semibold text-black underline"></h1>
          <div className="crypto-method my-5 flex flex-col items-center gap-5">
            <h2 className="mb-2 text-black">Choose a wallet</h2>
            {renderPayment("Metamask", WalletLogo.MetaMask)}
            {renderPayment("CoinBase", WalletLogo.CoinBase)}
            {renderPayment("Ledger", WalletLogo.Ledger)}
            {renderPayment("TrustWallet", WalletLogo.TrustWallet)}
            {renderPayment("WalletConnect", WalletLogo.WalletConnect)}
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

export default PaymentMethod
