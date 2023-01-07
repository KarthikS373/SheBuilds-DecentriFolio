import React from "react"
import { useRouter } from "next/router"

import Button from "../../../components/button/Button"
import Input from "../../../components/input/Input"
import AppLayout from "../../../components/layout/AppLayout"
import initializeMetamask, { accountChangedHandler } from "../../../utils/metamask.util"
import Wallets from "../../../assets/image/wallets/index"
import { SkeletonLoader } from "../../../components/loader/SkeletonLoader"
import FAQ from "../../../components/popup/FAQ.popup"

interface Props {
  [x: string]: any
}

const SelectedTicket = () => {
  const router = useRouter()
  const { id } = router.query

  const [defaultAccount, setDefaultAccount] = React.useState("")
  const [userBalance, setUserBalance] = React.useState("")
  const [items, setItems] = React.useState<Props>({})
  const [pageId, setPageId] = React.useState<string | string[] | undefined>()
  const [price, setPrice] = React.useState(0)
  const [clickedPopup, setClickedPopup] = React.useState<boolean>(false)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  const getData = () => {}

  React.useEffect(() => {
    if (window !== undefined || window !== null)
      window.ethereum?.on("accountsChanged", (account: React.SetStateAction<string>) =>
        setDefaultAccount(account)
      )
  }, [])

  React.useEffect(() => {
    initializeMetamask(setDefaultAccount, setUserBalance)
  }, [])

  return (
    <AppLayout>
      <div className="jumbotron py-16 bg-[#19083D] text-white p-5 flex items-center flex-col">
        <div className="jumbotron pt-10 bg-[#19083D] text-white p-0 flex items-center flex-col lg:flex-row justify-between">
          {Object.keys(items).length === 0 ? (
            <div className="mr-10">
              <SkeletonLoader />
            </div>
          ) : (
            <img
              src={items.image}
              alt="pic"
              width={400}
              height={250}
              className="rounded-3xl hover:brightness-75 transition duration-300"
            />
          )}
          <div className="lg:w-1/2">
            <h1 className="md:text-2xl text-3xl font-semibold mt-5 lg:mt-5 mb-5 lg:leading-[30px] leading-[40px] font-poppins">
              some Event name - {id}
            </h1>
            <div className="md:text-lg font-semibold mt-5 lg:mt-5 mb-2 lg:leading-[30px] leading-[40px] font-poppins">
              <p className="font-normal">
                <span className="text-[#B069FF] font-semibold">Jan 08, 2023</span> Morning, 8.30 AM
              </p>
            </div>
            <p className="mb-10">Somewhere under the sky, India</p>
            <p className="underline cursor-pointer hover:text-blue-900">Read more</p>
          </div>
        </div>
      </div>
      <div className="lg:w-[90%] p-5 min-h-screen mx-auto flex items-center justify-between md:flex-row flex-col">
        <form className="bg-primary md:p-10 p-6 text-white rounded-xl md:w-1/2 md:my-0 my-20 min-w-[320px]">
          <h1 className="font-bold text-2xl mb-8">Get Tickets</h1>
          <div className="flex flex-col">
            <div className="my-3">
              <Input
                type={"text"}
                name="email"
                className="rounded text-black w-full active:ring-2 active:ring-gray-400"
                placeholder="Email"
              />
            </div>

            <div className="my-3">
              <Input
                type={"number"}
                name="number-of-tickets"
                className="rounded text-black w-full active:ring-2 active:ring-gray-400"
                placeholder="Number of tickets"
              />
            </div>

            <div className="mt-5">
              <Button
                content=""
                type="button"
                className="bg-white/80 hover:bg-white w-1/2 text-black flex items-center rounded-xl py-4 md:flex-row flex-col px-6"
              >
                <div>
                  <img src={Wallets.MetaMask.src} className="w-[30px]" />
                </div>
                <p className="-mt-[5px] font-bold md:ml-5">Connect metamask wallet</p>
              </Button>
            </div>

            <div className="mt-5 flex md:flex-row flex-col items-center">
              <p>Don't have a metamask wallet yet?</p>
              <div className="font-bold md:ml-3">
                <p
                  className="cursor-pointer transition duration-200"
                  onClick={() => setClickedPopup(true)}
                >
                  FAQ
                </p>
              </div>
            </div>

            <hr className="mt-5" />

            <div className="mt-5 flex items-center justify-between md:flex-row flex-col">
              <div className="md:text-left text-center">
                <h3 className="font-bold text-2xl">Total Cost</h3>
                <h5 className="text-2xl">MATIC {price}</h5>
              </div>
            </div>
          </div>
        </form>
        <img src="" className="w-[400px]" />
      </div>
      {clickedPopup && <FAQ isClicked={clickedPopup} setIsClicked={setClickedPopup} />}
    </AppLayout>
  )
}

export default SelectedTicket
