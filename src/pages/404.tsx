import Link from "next/link"

import Button from "../components/button/Button"
import AppLayout from "../components/layout/AppLayout"

import svg404 from "../assets/svg/404.svg"

const NotFound = () => {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mt-20 flex flex-col md:flex-row md:p-0 p-2 items-center">
          <img src={svg404.src} className="w-[50vw]" />
          <div className="md:ml-5 mt-10 font-poppins md:block flex md:items-start items-center md:flex-row flex-col">
            <h4 className="text-primary text-sm font-light mb-1">Awww Snap :(((</h4>
            <p className="text-primary text-2xl font-bold mb-3">404 Error Not Found</p>
            <p className="text-primary text-center md:text-start w-[25vw]">
              This is not what you were looking for... But you just found the page we&apos;d lost,
              Thanks !!! <br />
              <br />
              But everything is still awesome...
            </p>
            <Link href="/">
              <Button content="" className="bg-primary text-white p-3 rounded-lg mt-5 text-sm">
                Go home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default NotFound
