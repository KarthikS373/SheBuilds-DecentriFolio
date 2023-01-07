import Head from "next/head"
import Image from "next/image"
import React from "react"
import Swal from "sweetalert2"

import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import OrganizerLayout from "../../components/layout/OrganizerLayout"

const CheckTicket = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [token, setToken] = React.useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    Swal.fire({
      title: "Ticket is valid",
      text: `your token is : ${token}`,
      icon: "success",
    })
  }

  return (
    <OrganizerLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <Head>
        <title>DecentriFolio - Check Ticket</title>
      </Head>
      <div className="min-h-screen rounded-2xl top-0 right-0 pt-32 w-full p-5">
        <div className="flex items-center flex-col">
          <h2 className="text-center text-primary text-2xl underline font-bold mb-5">
            Ticket Details
          </h2>
          <Button
            content=""
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-10 lg:hidden bg-primary p-3 rounded-xl text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Button>
          <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col">
            <Input
              type="text"
              className="w bg-white rounded-2xl border border-slate-500 md:w-[600px] w-full md:min-w-0 min-w-[280px]"
              placeholder="Enter Ticket token number"
              required
              onChange={(e) => setToken(e.target.value)}
            />
            <Button
              content=""
              className="font-semibold bg-primary text-white rounded-3xl px-20 py-3 mt-5"
            >
              Check ticket details
            </Button>
          </form>
        </div>
      </div>
    </OrganizerLayout>
  )
}

export default CheckTicket
