import Link from "next/link"
import * as React from "react"

import Props from "./Card.types"

const DefaultCard = ({
  date,
  image,
  title,
  body,
  slug,
  dir = "left",
  className,
  bottomChild,
}: Props) => {
  const renderPreview = () => {
    return (
      <div className="w-full overflow-hidden">
        <img
          className="duration-250 bg-center object-cover transition-all hover:scale-125"
          src={image}
          alt={title}
        />
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className="flex flex-col justify-start p-3 py-4">
        {date && (
          <div className="flex gap-2">
            <span className="mb-2 text-sm font-medium text-gray-400">{date}</span>
          </div>
        )}
        <span className="line-clamp-3 mt-2 text-2xl font-bold">{title}</span>
        <hr className="border-t-1 border-t-customYellow-100 my-3 w-12" />
        <span className="line-clamp-4 mb-4 text-base text-gray-700">{body}</span>
        <Link href={slug} className="text-customYellow-100 cursor-pointer text-sm underline">
          {bottomChild || <span>Read more</span>}
        </Link>
      </div>
    )
  }

  if (dir == "top" || dir == "bottom") {
    return (
      <div
        className={
          "min-w-lg hover:border-customYellow-100 grid grid-cols-1 overflow-hidden rounded-3xl bg-white text-left shadow-xl hover:border-[1px] hover:border-solid " +
          className
        }
      >
        {dir == "top" ? (
          <>
            {renderPreview()} {renderContent()}
          </>
        ) : (
          <>
            {renderContent()} {renderPreview()}
          </>
        )}
      </div>
    )
  }

  return (
    <div
      className={
        "min-w-lg hover:border-customYellow-100 m-10 grid grid-cols-1 overflow-hidden rounded-3xl bg-white text-left shadow-xl hover:border-[1px] hover:border-solid md:grid-cols-2 " +
        className
      }
    >
      {dir == "left" ? (
        <>
          {renderPreview()} {renderContent()}
        </>
      ) : (
        <>
          {renderContent()} {renderPreview()}
        </>
      )}
    </div>
  )
}

export default DefaultCard
