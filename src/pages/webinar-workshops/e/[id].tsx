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
      <div className=" flex flex-col items-center bg-[#19083D] p-5 py-16 text-white">
        <div className=" flex flex-col items-center justify-between bg-[#19083D] p-0 pt-10 text-white lg:flex-row">
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
              className="rounded-3xl transition duration-300 hover:brightness-75"
            />
          )}
          <div className="lg:w-1/2">
            <h1 className="mt-5 mb-5 font-poppins text-3xl font-semibold leading-[40px] md:text-2xl lg:mt-5 lg:leading-[30px]">
              some Event name - {id}
            </h1>
            <div className="mt-5 mb-2 font-poppins font-semibold leading-[40px] md:text-lg lg:mt-5 lg:leading-[30px]">
              <p className="font-normal">
                <span className="font-semibold text-[#B069FF]">Jan 08, 2023</span> Morning, 8.30 AM
              </p>
            </div>
            <p className="mb-10">Somewhere under the sky, India</p>
            <p className="cursor-pointer underline hover:text-blue-900">Read more</p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex min-h-screen flex-col items-center justify-between p-5 md:flex-row lg:w-[90%]">
        <form className="my-20 min-w-[320px] rounded-xl bg-primary p-6 text-white md:my-0 md:w-1/2 md:p-10">
          <h1 className="mb-8 text-2xl font-bold">Get Tickets</h1>
          <div className="flex flex-col">
            <div className="my-3">
              <Input
                type={"text"}
                name="email"
                className="w-full rounded text-black active:ring-2 active:ring-gray-400"
                placeholder="Email"
              />
            </div>

            <div className="my-3">
              <Input
                type={"number"}
                name="number-of-tickets"
                className="w-full rounded text-black active:ring-2 active:ring-gray-400"
                placeholder="Number of tickets"
              />
            </div>

            <div className="mt-5">
              <Button
                content=""
                type="button"
                className="flex w-1/2 flex-col items-center rounded-xl bg-white/80 py-4 px-6 text-black hover:bg-white md:flex-row"
              >
                <div>
                  <img src={Wallets.MetaMask.src} className="w-[30px]" />
                </div>
                <p className="-mt-[5px] font-bold md:ml-5">Connect metamask wallet</p>
              </Button>
            </div>

            <div className="mt-5 flex flex-col items-center md:flex-row">
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

            <div className="mt-5 flex flex-col items-center justify-between md:flex-row">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold">Total Cost</h3>
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
