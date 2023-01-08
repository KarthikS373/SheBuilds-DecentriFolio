import Link from "next/link"

import constructionSVG from "../../assets/svg/construction.svg"
import Button from "../button/Button"
import AppLayout from "../layout/AppLayout"

const UnderConstruction = () => {
  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mt-20 flex flex-col items-center p-2 md:flex-row md:p-0">
          <img src={constructionSVG.src} alt="Under construction" className="w-[50vw]" />
          <div className="mt-10 flex flex-col items-center font-poppins md:ml-5 md:block md:flex-row md:items-start">
            <p className="mb-3 text-2xl font-bold text-primary">Page Under Construction</p>
            <p className="text-center text-primary md:text-start">Aww snap :(((</p>
            <p className="mt-2 text-center text-primary md:text-start">
              The page you are looking for is currently under construction. <br />
              Hold back, we are working on making it live{" "}
            </p>
            <Link href="/">
              <Button content="" className="mt-5 rounded-lg bg-primary p-3 text-sm text-white">
                Go to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default UnderConstruction
