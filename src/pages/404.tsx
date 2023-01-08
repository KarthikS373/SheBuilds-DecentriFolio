import Link from "next/link"

import Button from "../components/button/Button"
import AppLayout from "../components/layout/AppLayout"

import svg404 from "../assets/svg/404.svg"

const NotFound = () => {
  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mt-20 flex flex-col items-center p-2 md:flex-row md:p-0">
          <img src={svg404.src} className="w-[50vw]" />
          <div className="mt-10 flex flex-col items-center font-poppins md:ml-5 md:block md:flex-row md:items-start">
            <h4 className="mb-1 text-sm font-light text-primary">Awww Snap :(((</h4>
            <p className="mb-3 text-2xl font-bold text-primary">404 Error Not Found</p>
            <p className="w-[25vw] text-center text-primary md:text-start">
              This is not what you were looking for... But you just found the page we&apos;d lost,
              Thanks !!! <br />
              <br />
              But everything is still awesome...
            </p>
            <Link href="/">
              <Button content="" className="mt-5 rounded-lg bg-primary p-3 text-sm text-white">
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
