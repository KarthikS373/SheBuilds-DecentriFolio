import Link from "next/link"
import React from "react"

import Button from "../button/Button"
import Props from "./Popup.types"

const FAQ = ({ isClicked, setIsClicked }: Props) => {
  return (
    <div
      className={`${
        isClicked ? "block" : "hidden"
      } fixed top-0  z-50 flex h-screen w-full cursor-pointer items-center justify-center`}
      style={{ backgroundColor: "rgba(50, 50, 93, 0.55" }}
    >
      <div className="relative max-h-[95vh] w-[90%] overflow-y-auto rounded-3xl bg-white p-8 md:w-[70%]">
        <div className="absolute right-10">
          <Button
            onClick={() => setIsClicked(!isClicked)}
            content=""
            className="rounded-xl bg-slate-100 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <p className="mb-10 text-center text-3xl font-bold uppercase">faq</p>
        <div className="">
          <p className="mb-3 font-poppins text-xl font-semibold">
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
            className="w-full rounded-lg shadow lg:w-[560px]"
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
