import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

import Button from "../../../components/button/Button"
import DefaultCard from "../../../components/card/Card"
import EventDetails from "../../../components/details/EventDetails"
import AppLayout from "../../../components/layout/AppLayout"
import { DefaultLoader, SkeletonLoader } from "../../../components/loader/SkeletonLoader"

const events = [
  {
    id: 0,
    date: "November 13, 2015",
    img: "https://free4kwallpapers.com/uploads/originals/2015/11/19/daft-punk-random-access-memories-wallpaper.jpg",
    title: "something something something",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/",
  },
  {
    id: 1,
    date: "November 13, 2015",
    img: "https://free4kwallpapers.com/uploads/originals/2015/11/19/daft-punk-random-access-memories-wallpaper.jpg",
    title: "something something something",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/",
  },
  {
    id: 2,
    date: "November 13, 2015",
    img: "https://free4kwallpapers.com/uploads/originals/2015/11/19/daft-punk-random-access-memories-wallpaper.jpg",
    title: "something something something",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/",
  },
]

interface Props {
  [x: string]: any
}

const Details = () => {
  const router = useRouter()
  const [items, setItems] = React.useState<Props>({})
  const [pageId, setPageId] = React.useState<string | string[] | undefined>("")

  React.useEffect(() => {
    setPageId(router.query.id)
  }, [router.query])

  React.useEffect(() => {
    getData()
  }, [pageId])

  const splitArray = (arr: string) => {
    let newArray: string[] = []

    if (arr !== undefined)
      newArray = arr.replace("[", "").replace("]", "").replaceAll('"', "").split(",")

    return newArray
  }

  const getData = () => {}

  return (
    <AppLayout>
      <Head>
        <title>DecentriFolio - {items.name || "party"}</title>
      </Head>
      <div className="jumbotron py-16 bg-[#19083D] text-white p-5 flex items-center flex-col">
        <div className="md:w-[90%] jumbotron pt-20 bg-[#19083D] text-white p-5 flex items-center flex-col-reverse lg:flex-row justify-between">
          <div className="lg:w-1/2">
            {Object.keys(items).length !== 0 ? (
              <>
                <h1 className="md:text-4xl text-3xl font-bold mt-5 lg:mt-5 mb-5 underline lg:leading-[50px] leading-[40px]">
                  {items.event_name}
                </h1>
                <p className="mb-10">{items.description}</p>
              </>
            ) : (
              <SkeletonLoader />
            )}

            <Button content="" className="mt-20 px-5 border-b-4 border-b-white">
              <p className="font-bold">Ticket</p>
            </Button>
          </div>
          <div>
            {Object.keys(items).length === 0 ? (
              <div className="bg-white p-5 h-fit rounded-lg">
                <DefaultLoader className="md:w-[300px] w-full md:h-[300px]" />
              </div>
            ) : (
              <img
                src={items.image}
                className="w-[400px] rounded-3xl hover:brightness-75 transition duration-300 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      <EventDetails />
      <div className="bg-gray-100">
        <div className="pb-20 px-6 pt-12 lg:px-32 ">
          <div className="mt-24">
            <h1 className="font-xl font-serif mb-4">Other events you may like:</h1>
            <div className="m-0 grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 lg:w-4/5 lg:grid-cols-3 lg:gap-2">
              {events.map((article) => (
                <DefaultCard
                  date={article.date}
                  className="w-full"
                  dir="top"
                  key={article.id}
                  id={article.id}
                  image={article.img}
                  title={article.title}
                  body={article.content}
                  slug={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Details
