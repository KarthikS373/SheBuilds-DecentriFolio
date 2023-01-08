import { ethers } from "ethers"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import { useWeb3React } from "@web3-react/core"

import WalletLogo from "../../assets/image/wallets"
import Button from "../../components/button/Button"
import AppLayout from "../../components/layout/AppLayout"
import { injectedProvider } from "../../utils/metamask.connect"

const Connect = () => {
  const { account, activate, active, chainId, connector, deactivate, error, setError, library } =
    useWeb3React()

  const router = useRouter()

  const [email, setEmail] = React.useState("")
  const [defaultAccount, setDefaultAccount] = React.useState("")
  const [userBalance, setUserBalance] = React.useState("")

  const connect = async () => {
    try {
      if (!connector) {
        try {
          await activate(injectedProvider)
          Swal.fire({
            title: "Success Connecting",
            icon: "success",
          })
        } catch (e: any) {
          throw new Error(e)
        }
      } else {
        toast("Already connected", { duration: 1500 })
      }

      setTimeout(() => {
        router.push("/organizer/host-event")
      }, 300)
    } catch (e) {
      let message = "An unknown Error occured"
      if (error instanceof Error) message = error.message

      Swal.fire({
        title: message,
        icon: "error",
      })
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    connect()
  }

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

  return (
    <AppLayout>
      <Head>
        <title>DecentriFolio - connect</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-between bg-[#19083D] px-20 pt-40 lg:flex-row">
        <h1 className="mb-10 w-full text-5xl font-bold text-white lg:mb-0 lg:w-1/2">
          Host your events
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-10 w-[80%] min-w-[300px] rounded-xl bg-white p-10 lg:mb-0 lg:w-1/2"
        >
          <h2 className="mb-5 text-3xl font-bold underline">Connect</h2>
          <div className="flex flex-col items-center">
            {/* <div className="my-5 w-full">
              <Input
                type="email"
                className="border rounded-2xl w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                beginningIcon={<img src={personSVG.src} alt="Email" className="w-[28px] pb-1" />}
                required
              />
            </div> */}
            <div className="my-5 w-full">
              <Button
                content=""
                type="button"
                className="flex w-full flex-col items-center rounded-3xl border border-primary bg-white p-5 text-black md:flex-row"
                // onClick={initializeMetamask}
                onClick={connect}
              >
                <div className="d:mb-0 mb-6">
                  <img src={WalletLogo.MetaMask.src} className="w-[50px]" />
                </div>
                <p className="-mt-[5px] font-semibold md:ml-5">Connect to MetaMask</p>
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <hr />
            <p>
              Don't have a metamask wallet?{" "}
              <span className="font-bold text-[#19083D]">
                <Link href="">Create wallet</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

export default Connect
