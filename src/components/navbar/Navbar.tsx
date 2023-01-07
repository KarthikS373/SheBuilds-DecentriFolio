import { deleteCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"

import categories from "../../data/categories.data"
import Button from "../button/Button"
import Input from "../input/Input"
import Props from "./Navbar.types"

import eventSVG from "../../assets/svg/cultural.svg"

const Navbar = ({ isAuthenticated, isSearchBar = false }: Props) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const route = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("Authorization")
    deleteCookie("auth")
    route.push("/organizer/connect")
  }

  return (
    <>
      <div className="lg:flex fixed top-0 w-full hidden items-center justify-between bg-[#142850] py-1 px-4 z-50">
        <div className="flex items-center">
          <div className="text-white">
            <Link href="/" className="cursor-pointer">
              <img src="/images/logo.png" alt="DecentriFolio Logo" width={200} height={80} />
            </Link>
          </div>
          <div className="ml-10">
            <ul className="flex items-center">
              {!isSearchBar ? (
                categories.map((category, index) => (
                  <li className="mx-5 text-white" key={index}>
                    <Link href={category.link}>{category.category}</Link>
                  </li>
                ))
              ) : isSearchBar ? (
                <Input
                  type="text"
                  className="p-3 rounded-xl text-slate-700 w-[400px] pr-[100px] focus:ring-4 focus:ring-slate-400"
                  placeholder="cari tiket yang anda inginkan"
                  endIcon={
                    <Button
                      type="submit"
                      content=""
                      className="text-slate-500 w-[100%] bg-[#273568] rounded-lg p-2 px-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </Button>
                  }
                />
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
        {isAuthenticated ? (
          <Button
            content="Logout"
            className="p-3 bg-white text-black rounded-xl"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          !isAuthenticated && (
            <div className="flex items-center">
              <Link href="/organizer/connect">
                <div className="mr-10 flex items-center cursor-pointer hover:brightness-90 transition duration-300">
                  <img src={eventSVG.src} width={30} />
                  <p className="ml-2 font-semibold text-white ">Create Event</p>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
      <div className="responsived fixed top-0 w-full flex items-center justify-between bg-[#19083D] py-1 px-4 lg:hidden z-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="text-white cursor-pointer">
              <img src="/images/logo.png" alt="Logo" width={130} height={80} />
            </Link>
          </div>
          <button onClick={() => setIsVisible(!isVisible)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div
          className={`px-5 py-5 absolute top-20 bg-[#19083D] w-full left-0 ${
            isVisible ? "" : "hidden"
          }`}
        >
          <ul className="flex items-start flex-col mb-5">
            {categories.map((category, index) => (
              <Link href={category.link} className="" key={index}>
                <div className="mr-5 hover:bg-white hover:text-[#19083D] text-white w-full p-4 my-2 transition duration-300">
                  <li>{category.category}</li>
                </div>
              </Link>
            ))}
            {isSearchBar && (
              <Input
                type="text"
                className="p-3 rounded-xl text-slate-700 w-full pr-[100px] focus:ring-4 focus:ring-slate-400 relative"
                placeholder="cari tiket yang anda inginkan"
                endIcon={
                  <Button
                    type="submit"
                    content=""
                    className="text-slate-500 w-[100%] bg-[#273568] rounded-lg p-2 px-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </Button>
                }
              />
            )}
          </ul>
          {isAuthenticated ? (
            <Button content="" className="text-primary rounded-lg font-bold font-montserrat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          ) : (
            <div className="flex items-center w-full justify-center">
              <Link href="/organizer/make-event">
                <div className="mr-5 flex items-center lg:mb-3">
                  <img src="/images/buat_event.svg" width={30} />
                  <p className="ml-2 font-semibold text-white">Buat Event</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default Navbar
