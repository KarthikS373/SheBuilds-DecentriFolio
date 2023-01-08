import Link from "next/link"

import Props from "./EventCard.types"

const EventCard = ({ name, time, place, id, imageUrl }: Props) => {
  return (
    <Link href={`/concert/${id}/details`} className="">
      <div className="relative my-3 min-w-[300px] cursor-pointer rounded-xl bg-slate-200 text-left text-slate-800 md:m-5 md:min-w-[360px] md:max-w-[360px] lg:my-0">
        <div
          className={`h-[300px] min-w-[200px] cursor-pointer rounded-xl bg-cover transition duration-300 hover:brightness-75`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="p-3">
          <div>
            <h3 className="mb-5 min-h-[50px] font-montserrat text-xl font-semibold">
              {name.substring(0, 50)} {name.length > 50 ? "..." : ""}
            </h3>
          </div>
          <div className="">
            <h5 className="text-md mb-2 font-poppins font-semibold">{time}</h5>
            <p>{place}</p>
          </div>
          <div>{/* <Button content="" className="bg-[#19083D]"></Button> */}</div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
