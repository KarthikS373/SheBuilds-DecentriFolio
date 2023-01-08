import Image from "next/image"
import AppLayout from "../components/layout/AppLayout"
import styled from "styled-components"
import EventCard from "../components/event/EventCard"
import axios from "axios"
import React from "react"
import { DefaultLoader, SkeletonLoader } from "../components/loader/SkeletonLoader"
import { motion } from "framer-motion"
import Head from "next/head"

interface Props {
  [x: string]: any
}

const Dashboard = () => {
  const [data, setData] = React.useState<Props>([])

  React.useEffect(() => {
    getData()
  }, [])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  const getData = () => {
    setData([])
  }

  return (
    <AppLayout>
      <Head>
        <title>DecentriFolio | Party</title>
      </Head>
      <div className="jumbotron pt-20 bg-primary text-white p-5 flex items-center flex-col text-center min-h-screen">
        <div>
          <h1 className="md:text-5xl text-4xl font-bold mb-5 mt-10 uppercase">Party</h1>
          <p className="mb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae autem temporibus in!
          </p>
        </div>
        <div>
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="flex lg:flex-row flex-col"
          >
            {data.length !== 0 ? (
              data?.map(
                (
                  item: { id: number; image: string; event_name: string; location: string },
                  index: React.Key | null | undefined
                ) => (
                  <EventCard
                    imageUrl={item.image}
                    key={index}
                    id={item.id}
                    name={item.event_name}
                    time={"2022-06-20"}
                    place={item.location}
                  />
                )
              )
            ) : (
              <div className="bg-white p-5 h-fit rounded-lg md:w-[400px] w-[300px] md:h-[460px]">
                <DefaultLoader />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
