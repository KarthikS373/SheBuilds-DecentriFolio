import { ethers } from "ethers"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

import WalletLogo from "../../assets/image/wallets"
import Button from "../../components/button/Button"
import AppLayout from "../../components/layout/AppLayout"

const Connect = () => {
  const route = useRouter()
  const [email, setEmail] = React.useState("")
  const [defaultAccount, setDefaultAccount] = React.useState("")
  const [userBalance, setUserBalance] = React.useState("")

  const connect = () => {
    Swal.fire({
      title: "Success Connecting",
      icon: "success",
    })

    window.localStorage.setItem("Authorization", "uuID")
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
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
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
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      <div className="bg-[#19083D] pt-40 px-20 min-h-screen flex justify-between items-center lg:flex-row flex-col">
        <h1 className="text-white font-bold text-5xl lg:w-1/2 w-full lg:mb-0 mb-10">
          Host your events
        </h1>
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 w-[80%] min-w-[300px] p-10 rounded-xl bg-white lg:mb-0 mb-10"
        >
          <h2 className="underline font-bold text-3xl mb-5">Connect</h2>
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
                className="border border-primary bg-white w-full text-black flex items-center rounded-3xl md:flex-row flex-col p-5"
                onClick={initializeMetamask}
              >
                <div className="mb-6 d:mb-0">
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
              <span className="text-[#19083D] font-bold">
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
