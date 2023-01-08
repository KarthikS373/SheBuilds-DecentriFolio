import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import React from "react"

import Button from "../components/button/Button"
import Input from "../components/input/Input"
import AppLayout from "../components/layout/AppLayout"
import { SkeletonLoader } from "../components/loader/SkeletonLoader"
import homeSVG from "../assets/svg/home.svg"
import { DecoderText } from "../components/decoder-text/DecoderText"
import categories from "../data/categories.data"
import DefaultCard from "../components/card/Card"

const Dashboard = () => {
  const [data, setData] = React.useState<Array<{
    image: string
    name: string
    id: string
    link: string
    content: string
  }> | null>(null)

  React.useEffect(() => {
    getData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("Authorization")
    window.location.reload()
  }

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  const getData = () => {
    setData([
      {
        image:
          "https://media.istockphoto.com/id/1324006497/photo/music-controller-dj-mixer-in-a-nightclub-at-a-party.jpg?b=1&s=170667a&w=0&k=20&c=8UWTZesYCiRUZVC-QSv-6Q4VFh78mSIQQmkQY3aa_tM=",
        name: "Some event 1",
        id: "0",
        link: "#",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, optio sint aut quasi a ad reprehenderit aperiam architecto unde nihil.",
      },
      {
        image:
          "https://media.istockphoto.com/id/1324006497/photo/music-controller-dj-mixer-in-a-nightclub-at-a-party.jpg?b=1&s=170667a&w=0&k=20&c=8UWTZesYCiRUZVC-QSv-6Q4VFh78mSIQQmkQY3aa_tM=",
        name: "Some event 1",
        id: "1",
        link: "#",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, optio sint aut quasi a ad reprehenderit aperiam architecto unde nihil.",
      },
      {
        image:
          "https://media.istockphoto.com/id/1324006497/photo/music-controller-dj-mixer-in-a-nightclub-at-a-party.jpg?b=1&s=170667a&w=0&k=20&c=8UWTZesYCiRUZVC-QSv-6Q4VFh78mSIQQmkQY3aa_tM=",
        name: "Some event 1",
        id: "2",
        link: "#",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, optio sint aut quasi a ad reprehenderit aperiam architecto unde nihil.",
      },
    ])
  }

  return (
    <AppLayout>
      <Head>
        <title>DecentriFolio | Home </title>
      </Head>
      <div className="flex flex-col-reverse items-center justify-between bg-[#142850] p-5 px-10 pt-20 text-white lg:flex-row">
        <div className="md:w-1/2">
          <h1 className="mb-5 max-w-xl text-4xl font-bold md:text-5xl">
            <DecoderText
              text={"The cheapest tickets on the Internet, Period."}
              start={true}
              delay={3}
              className={"w-lg"}
            />
          </h1>
          <p className="mb-10">
            Zero hidden service charges, fully transparent, fraud-tamper free. Because it should be{" "}
            <strong>
              <em>easy</em>
            </strong>{" "}
            this way
          </p>
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              className="w-full rounded p-3 pr-[100px] text-slate-700 focus:ring-2 focus:ring-slate-400"
              placeholder="Search for Events"
              endIcon={
                <Button
                  content=""
                  className="w-[100%] rounded-lg bg-[#273568] p-2 px-3 text-slate-500"
                >
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </Button>
              }
            />
          </form>
        </div>
        <div>
          <img src={homeSVG.src} alt="Home SVG" className="md:w-[700px]" />
        </div>
      </div>
      <div className="px-10">
        <div>
          <h4 className="my-10 text-xl font-bold">Categories</h4>
          <div className="flex flex-col flex-wrap py-2 lg:flex-row">
            {categories.map((category, index) => (
              <Link
                href={category.link}
                className={`relative my-2 min-h-[100px] w-full min-w-[200px] cursor-pointer rounded-lg bg-cover transition hover:brightness-75 lg:m-2 lg:mx-10 lg:my-3 lg:w-fit`}
                style={{
                  backgroundImage:
                    "url('https://media.istockphoto.com/id/1324006497/photo/music-controller-dj-mixer-in-a-nightclub-at-a-party.jpg?b=1&s=170667a&w=0&k=20&c=8UWTZesYCiRUZVC-QSv-6Q4VFh78mSIQQmkQY3aa_tM=')",
                  position: "relative",
                }}
              >
                <p className="absolute left-5 bottom-3 font-bold text-white">{category.category}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="my-10">
          <h4 className="my-5 ml-2 text-xl font-bold">Trending Events</h4>
          <div className="md:ml-10">
            <div>
              <h5 className="my-5 ml-1 text-lg font-bold">Parties</h5>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:flex-row">
                {data && Object.keys(data).length !== 0 ? (
                  data.map(
                    (
                      item: {
                        image: string
                        name: string
                        id: string
                        link: string
                        content: string
                      },
                      index
                    ) => {
                      return (
                        <DefaultCard
                          dir="top"
                          className="max-w-lg"
                          image={item.image}
                          title={item.name}
                          body={item.content}
                          slug={item.link}
                          id={item.id}
                          key={item.id}
                        />
                      )
                    }
                  )
                ) : (
                  <SkeletonLoader />
                )}
              </div>
            </div>
            <div>
              <h5 className="my-5 text-lg font-bold">Hackathons</h5>
              <h5 className="my-5 text-lg font-bold">Webinars & Workshops</h5>
              <h5 className="my-5 text-lg font-bold">Cultural</h5>
              <h5 className="my-5 text-lg font-bold">College Events</h5>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
