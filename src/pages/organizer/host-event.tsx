import axios from "axios"
import Head from "next/head"
import React, { SetStateAction } from "react"
import Swal from "sweetalert2"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import OrganizerLayout from "../../components/layout/OrganizerLayout"
import categories from "../../data/categories.data"

const MakeEvent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [stakeholderCount, setStakeholderCount] = React.useState(0)
  const [stakeholderArr, setStakeholderArr] = React.useState<SetStateAction<any>>([])
  const [ticketDesign, setTicketDesign] = React.useState<SetStateAction<any>>()
  const [cover, setCover] = React.useState<SetStateAction<any>>()

  // event datas
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

  const handleSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
  }

  return (
    <OrganizerLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <Head>
        <title>DecentriFolio | Event Organizer</title>
      </Head>
      <div className="min-h-screen rounded-2xl top-0 right-0 pt-32 w-full p-5">
        <div className="flex flex-col">
          <h2 className="text-center text-primary text-2xl font-bold mb-5 capitalize">
            Planning an event? Start selling the tickets here...
          </h2>
          <p className="text-primary text-2xl font-bold capitalize mb-2">Ticket Info</p>
          <form onSubmit={handleSubmit}>
            <div className="border-2 p-3 rounded-lg">
              <div>
                <div className="ticket-design ">
                  <p className="capitalize text-xl mb-2">Ticket NFT</p>
                  <div
                    className="bg-gray-400 text-white w-[250px] h-[200px] rounded-2xl relative bg-cover bg-center"
                    style={{ backgroundImage: `url('${ticketDesign}')` }}
                  >
                    <Input
                      onChange={(e) => {
                        if (e.target.files !== undefined && e.target.files !== null) {
                          let objectURL = null
                          if (e.target.files.length > 0)
                            objectURL = URL.createObjectURL(e.target.files[0])
                          setTicketDesign(objectURL)
                        }
                      }}
                      type="file"
                      accept="image/*"
                      name="ticket-design"
                      className="opacity-0 cursor-pointer absolute top-0 h-[200px] w-full"
                    />
                  </div>
                  <p className="text-sm mt-3">Add a ticket</p>
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <div className="w-[45%]">
                  <div className="mb-2">
                    <p className="mb-2">Event name</p>
                    <Input
                      placeholder="Event name*"
                      type="text"
                      className="ring-1 rounded-lg w-full"
                      required
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <p className="mb-2">Event Category</p>
                    <select
                      placeholder="Event Category"
                      className="p-2 ring-1 ring-primary rounded-lg w-full"
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
                </div>
                <div className="ticket-design w-[45%] mb-5">
                  <p className="capitalize text-xl mb-2">Cover Image</p>
                  <div
                    className="bg-cover bg-center bg-gray-400 text-white h-[200px] rounded-2xl relative"
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
                      className="opacity-0 cursor-pointer absolute top-0 h-[200px] w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <div>
                  <p className="mb-2">Organizer</p>
                  <Input
                    type="text"
                    placeholder="Organizer name"
                    className="ring-1 rounded-lg"
                    onChange={(e) => setHostName(e.target.value)}
                  />
                </div>
                <div className="ml-5">
                  <div className="flex items-center w-fit">
                    <div>
                      <p className="mb-2">Date</p>
                      <Input type="date" className="ring-1 rounded-lg" />
                    </div>
                    <div className="ml-4">
                      <p className="mb-2">Event starts : </p>
                      <Input type="time" placeholder="Start time" className="ring-1 rounded-lg" />
                    </div>
                    <div className="ml-4">
                      <p className="mb-2">Event ends : </p>
                      <Input type="time" placeholder="End time" className="ring-1 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="mb-2">Location</p>
                <Input
                  type="text"
                  placeholder="Event location"
                  className="ring-1 rounded-lg w-1/2"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="my-4 w-fit">
              <p className="capitalize text-primary font-bold text-2xl mb-2">
                Additional Information
              </p>
              <div>
                <p className="font-poppins">Tickets</p>
              </div>
              <div className="flex">
                <div className="border rounded-lg p-3 m-2">
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
                <div className="border rounded-lg p-3 m-2">
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
                <div className="border rounded-lg p-3 m-2">
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
            <div className="my-4 w-fit">
              <div>
                <p className="font-poppins">Stake Holders</p>
                <select
                  placeholder="kategori event"
                  className="p-2 ring-1 ring-primary rounded-lg min-w-[200px]"
                  onChange={(e) => setStakeholderCount(parseInt(e.target.value))}
                  defaultValue={1}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className="flex">
                {stakeholderArr?.map((data: any, index: any) => {
                  return (
                    <div className="border rounded-lg p-3 m-2" key={index}>
                      <Input
                        type="text"
                        placeholder="Wallet Address"
                        className="border-b"
                        required
                      />
                      <Input type="text" placeholder="Percentage" className="border-b" required />
                    </div>
                  )
                })}
              </div>
              <Button content="" className="capitalize bg-primary rounded-lg p-3 text-white">
                Add to sales
              </Button>
            </div>
          </form>
        </div>
      </div>
    </OrganizerLayout>
  )
}

export default MakeEvent
