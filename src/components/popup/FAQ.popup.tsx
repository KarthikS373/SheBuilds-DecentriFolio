import Link from "next/link"
import React from "react"

import Button from "../button/Button"
import Props from "./Popup.types"

const FAQ = ({ isClicked, setIsClicked }: Props) => {
  return (
    <div
      className={`${
        isClicked ? "block" : "hidden"
      } w-full z-50  fixed top-0 h-screen flex items-center justify-center cursor-pointer`}
      style={{ backgroundColor: "rgba(50, 50, 93, 0.55" }}
    >
      <div className="rounded-3xl bg-white p-8 md:w-[70%] w-[90%] max-h-[95vh] overflow-y-auto relative">
        <div className="absolute right-10">
          <Button
            onClick={() => setIsClicked(!isClicked)}
            content=""
            className="bg-slate-100 p-3 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <p className="uppercase font-bold text-3xl text-center mb-10">faq</p>
        <div className="">
          <p className="font-semibold text-xl font-poppins mb-3">
            How to create a metamask wallet account?
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur earum quis voluptates
            dolorum sit id possimus commodi quia, corrupti distinctio perspiciatis minima aliquam
            est vitae obcaecati, inventore cupiditate tempora ipsam velit animi! Iste corporis
            voluptatum nemo, cupiditate dolorum rem iure laboriosam nostrum neque voluptatibus
            eligendi ducimus, sed consequuntur et temporibus soluta tenetur ea recusandae,
            consequatur deserunt quos deleniti. Dolor laudantium consequuntur ratione necessitatibus
            veritatis officiis!
          </p>
          <iframe
            className="rounded-lg shadow lg:w-[560px] w-full"
            height="315"
            src="https://www.youtube.com/@metamask"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <Link href={"/faq"}>Learn more</Link>
        </div>
      </div>
    </div>
  )
}

export default FAQ
