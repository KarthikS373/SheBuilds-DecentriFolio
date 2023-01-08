import React, { useEffect } from "react"
import Button from "../button/Button"

import Props from "./Sidebar.types"

const sidebarData = [
  {
    name: "Organize a new event",
    icon: "",
    href: "/organizer/host-event",
  },
  {
    name: "Check ticket",
    icon: "",
    href: "/organizer/check-ticket",
  },
  {
    name: "My events",
    icon: "",
    href: "/organizer/my-events",
  },
]

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`lg:hidden ${
          isSidebarOpen ? "absolute" : "hidden"
        } top-0 bottom-0 left-0 right-0 bg-white`}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 z-40 min-h-screen bg-primary px-3 lg:z-10 lg:w-[25%] lg:translate-x-0 ${
            isSidebarOpen ? "w-full translate-x-0" : "-translate-x-[1000px]"
          } transition`}
        >
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            content=""
            className="mt-32 mb-5 rounded-xl bg-white p-3 text-primary lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
          <ul className="lg:pt-32">
            {sidebarData.map((item, index) => {
              return (
                <a href={item.href} key={index}>
                  <Button
                    key={index}
                    content=""
                    className="flex w-full cursor-pointer justify-between border-b-2"
                    endIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    }
                  >
                    <li key={index} className="relative my-4 flex items-center text-lg text-white">
                      <img src={item.icon} className="rounded-lg bg-white" />
                      <p className="ml-5">{item.name}</p>
                    </li>
                  </Button>
                </a>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
