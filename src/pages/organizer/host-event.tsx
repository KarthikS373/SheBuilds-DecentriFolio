import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import Head from "next/head"
import React, { SetStateAction } from "react"
import Swal from "sweetalert2"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import OrganizerLayout from "../../components/layout/OrganizerLayout"
import categories from "../../data/categories.data"

const MakeEvent = () => {
  const { connector } = useWeb3React()

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [address, setAddress] = React.useState<string | null>(null)
  const [stakeholderCount, setStakeholderCount] = React.useState(0)
  const [stakeholderArr, setStakeholderArr] = React.useState<SetStateAction<any>>([])
  const [ticketDesign, setTicketDesign] = React.useState<SetStateAction<any>>()
  const [cover, setCover] = React.useState<SetStateAction<any>>()

  const [eventName, setEventName] = React.useState<SetStateAction<String>>("")
  const [eventCategory, setEventCategory] = React.useState<SetStateAction<String>>("")
  const [hostName, setHostName] = React.useState<SetStateAction<String>>("")
  const [location, setLocation] = React.useState<SetStateAction<String>>("")

  React.useEffect(() => {
    setStakeholderArr([])

    for (let i = 1; i <= stakeholderCount; i++) setStakeholderArr((prev: any) => [...prev, i])
  }, [stakeholderCount])

  React.useEffect(() => {
    setStakeholderArr([1])
  }, [])

  React.useEffect(() => {
    ;(async () => {
      const account = await connector?.getAccount()
      if (account) setAddress(account)
    })()
  }, [])

  const handleSubmit = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
  }

  return (
    <OrganizerLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <Head>
        <title>DecentriFolio | Event Organizer</title>
      </Head>
      <div className="top-0 right-0 min-h-screen w-screen rounded-2xl p-5 pt-32">
        <div className="flex flex-col">
          <h2 className="mb-5 text-center text-2xl font-bold capitalize text-primary">
            Planning an event? Start selling the tickets here...
          </h2>
          <p className="mb-2 text-2xl font-bold capitalize text-primary">Ticket Info</p>
          <form onSubmit={handleSubmit}>
            <div className="rounded-lg border-2 p-3">
              <div>
                <div className="ticket-design ">
                  <p className="mb-2 text-xl capitalize">Ticket NFT</p>
                  <div
                    className="relative min-h-[250px] w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white"
                    style={{
                      backgroundImage: `url('${ticketDesign}')`,
                      backgroundPosition: "center",
                    }}
                  >
                    <Input
                      onChange={(event) => {
                        if (event.target.files !== undefined && event.target.files !== null) {
                          setTicketDesign(event.target.files[0])
                        }
                      }}
                      type="file"
                      accept="image/*"
                      name="ticket-design"
                      className="absolute top-0 h-[200px] w-full cursor-pointer opacity-0"
                    />
                  </div>
                  <p className="mt-3 text-sm italic text-gray-600/50">
                    For better quality ues 1200 * 630 pixel
                  </p>
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <div className="w-[45%]">
                  <div className="mb-2">
                    <p className="mb-2">Event name</p>
                    <Input
                      placeholder="Event name*"
                      type="text"
                      className="w-full rounded-lg ring-1"
                      required
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <p className="mb-2">Event Category</p>
                    <select
                      placeholder="Event Category"
                      className="w-full rounded-lg p-2 ring-1 ring-primary"
                      onChange={(e) => setEventCategory(e.target.value)}
                      defaultValue={"Concert"}
                    >
                      {categories.map((category, index) => {
                        return (
                          <option key={index} value={category.category}>
                            {category.category}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="mb-6 mt-2">
                    <div className="flex w-fit items-center">
                      <div>
                        <p className="mb-2">Date</p>
                        <Input type="date" className="rounded-lg ring-1" />
                      </div>
                      <div className="ml-4">
                        <p className="mb-2">Event starts : </p>
                        <Input type="time" placeholder="Start time" className="rounded-lg ring-1" />
                      </div>
                      <div className="ml-4">
                        <p className="mb-2">Event ends : </p>
                        <Input type="time" placeholder="End time" className="rounded-lg ring-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ticket-design mb-5 w-[45%]">
                  <p className="mb-2 text-xl capitalize">Cover Image</p>
                  <div
                    className="relative h-[200px] rounded-2xl bg-gray-400 bg-cover bg-center text-white"
                    style={{ backgroundImage: `url('${cover}')` }}
                  >
                    <Input
                      onChange={(e) => {
                        if (e.target.files !== undefined && e.target.files !== null) {
                          let objectURL = null
                          if (e.target.files.length > 0)
                            objectURL = URL.createObjectURL(e.target.files[0])
                          setCover(objectURL)
                        }
                      }}
                      type="file"
                      accept="image/*"
                      name="concert-map"
                      className="absolute top-0 h-[200px] w-full cursor-pointer opacity-0"
                    />
                  </div>
                </div>
              </div>
              <div className="justify-betweens flex w-full flex-row gap-10">
                <div className="flex-1">
                  <div>
                    <p className="mb-2">Organizer</p>
                    <Input
                      type="text"
                      placeholder="Organizer name"
                      className="w-1/2 rounded-lg ring-1"
                      onChange={(e) => setHostName(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <p className="mb-2">Location</p>
                    <Input
                      type="text"
                      placeholder="Event location"
                      className="w-full rounded-lg ring-1"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <textarea
                  placeholder="Describe your event"
                  className="focus:ring-3 h-[170px] w-[650px] rounded-lg p-4 outline-none ring-1 ring-[#19083D] transition duration-300"
                />
              </div>
            </div>
            <div className="my-4 w-fit">
              <p className="mb-2 text-2xl font-bold capitalize text-primary">
                Additional Information
              </p>
              <div>
                <p className="font-poppins">Tickets</p>
              </div>
              <div className="flex">
                <div className="m-2 rounded-lg border p-3">
                  <h4 className="text-center font-light ">Premier</h4>
                  <Input
                    type="text"
                    placeholder="Total number of Tickets"
                    className="border-b"
                    required
                  />
                  <Input type="text" placeholder="Section" className="border-b" />
                  <Input type="text" placeholder="Notes" className="border-b" />
                </div>
                <div className="m-2 rounded-lg border p-3">
                  <h4 className="text-center font-light ">VIP</h4>
                  <Input
                    type="text"
                    placeholder="Total number of Tickets"
                    className="border-b"
                    required
                  />
                  <Input type="text" placeholder="Section" className="border-b" />
                  <Input type="text" placeholder="Notes" className="border-b" />
                </div>
                <div className="m-2 rounded-lg border p-3">
                  <h4 className="text-center font-light ">Normal</h4>
                  <Input
                    type="text"
                    placeholder="Total number of Tickets"
                    className="border-b"
                    required
                  />
                  <Input type="text" placeholder="Section" className="border-b" />
                  <Input type="text" placeholder="Notes" className="border-b" />
                </div>
              </div>
            </div>
            <Button content="" className="rounded-lg bg-primary p-3 capitalize text-white">
              Add to sales
            </Button>
          </form>
        </div>
      </div>
    </OrganizerLayout>
  )
}

export default MakeEvent
