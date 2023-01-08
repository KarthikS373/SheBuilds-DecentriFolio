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
      <div className=" flex flex-col items-center bg-[#19083D] p-5 py-16 text-white">
        <div className=" flex flex-col-reverse items-center justify-between bg-[#19083D] p-5 pt-20 text-white md:w-[90%] lg:flex-row">
          <div className="lg:w-1/2">
            {Object.keys(items).length !== 0 ? (
              <>
                <h1 className="mt-5 mb-5 text-3xl font-bold leading-[40px] underline md:text-4xl lg:mt-5 lg:leading-[50px]">
                  {items.event_name}
                </h1>
                <p className="mb-10">{items.description}</p>
              </>
            ) : (
              <SkeletonLoader />
            )}

            <Button content="" className="mt-20 border-b-4 border-b-white px-5">
              <p className="font-bold">Ticket</p>
            </Button>
          </div>
          <div>
            {Object.keys(items).length === 0 ? (
              <div className="h-fit rounded-lg bg-white p-5">
                <DefaultLoader className="w-full md:h-[300px] md:w-[300px]" />
              </div>
            ) : (
              <img
                src={items.image}
                className="w-[400px] cursor-pointer rounded-3xl transition duration-300 hover:brightness-75"
              />
            )}
          </div>
        </div>
      </div>
      <EventDetails />
      <div className="bg-gray-100">
        <div className="px-6 pb-20 pt-12 lg:px-32 ">
          <div className="mt-24">
            <h1 className="font-xl mb-4 font-serif">Other events you may like:</h1>
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
