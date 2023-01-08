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
      <div className="top-0 right-0 min-h-screen w-full rounded-2xl p-5 pt-32">
        <div className="flex flex-col items-center">
          <h2 className="mb-5 text-center text-2xl font-bold text-primary underline">
            Ticket Details
          </h2>
          <Button
            content=""
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-10 rounded-xl bg-primary p-3 text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Button>
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <Input
              type="text"
              className="w w-full min-w-[280px] rounded-2xl border border-slate-500 bg-white md:w-[600px] md:min-w-0"
              placeholder="Enter Ticket token number"
              required
              onChange={(e) => setToken(e.target.value)}
            />
            <Button
              content=""
              className="mt-5 rounded-3xl bg-primary px-20 py-3 font-semibold text-white"
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
