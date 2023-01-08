import React from "react"

const data: Array<{
  id: number
  src: string
  name: string
  link: string
  position: "left" | "right"
}> = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Event 0",
    link: "#",
    position: "left",
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Event 1",
    link: "#",
    position: "right",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Event 2",
    link: "#",
    position: "left",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Event 3",
    link: "#",
    position: "right",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Event 4",
    link: "#",
    position: "left",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Event 5",
    link: "#",
    position: "right",
  },
]

interface CarouselData {
  id: number
  image: string
  text: string
  textAlign: string
  color: string
  position: string
}

function Carousel() {
  const [current, setCurrent] = React.useState(0)

  const accumulator: Array<React.RefObject<HTMLElement>> = []
  const refs: any = data.reduce((dt, _val, i: number) => {
    accumulator[i] = React.createRef()
    return accumulator
  }, {})

  const scrollToImage = (i: number) => {
    setCurrent(i)
    refs[i].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  const carouselHeight = "max-h-[480px]"

  return (
    <div
      className={`relative flex ${carouselHeight} w-screen items-center justify-center overflow-hidden`}
    >
      <div className={`h-full ${carouselHeight} w-full`}>
        <div className="carousel h-full">
          {data.map((event, i) => (
            <div className="relative h-full w-full flex-shrink-0" key={event.name} ref={refs[i]}>
              <img src={event.src} className="w-full object-contain" />
              <div
                className={
                  "z-100 absolute top-[40%] mt-5 w-[65%] translate-y-[-50%] px-[10%] " +
                  (event.position == "left" ? "left-[3%] text-left" : "right-[10%] text-right")
                }
              >
                <span
                  className={
                    "mt-2 font-bold text-white sm:text-3xl lg:text-5xl " +
                    " " +
                    (event.position == "left" ? "text-left" : "text-right")
                  }
                >
                  {event.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="z-300 absolute bottom-3 left-[50%] translate-x-[-50%]">
          {data.map((event, index) => (
            <button
              key={event.name}
              onClick={() => {
                scrollToImage(event.id)
              }}
              style={{
                backgroundColor: index <= current ? "white" : "transparent",
                height: "12px",
                width: "12px",
                borderWidth: "2px",
                borderRadius: "50%",
                borderColor: "white",
              }}
              className="mr-3 transition-all duration-300"
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
