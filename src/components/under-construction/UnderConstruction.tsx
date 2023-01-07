import Link from "next/link"

import constructionSVG from "../../assets/svg/construction.svg"
import Button from "../button/Button"
import AppLayout from "../layout/AppLayout"

const UnderConstruction = () => {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mt-20 flex flex-col md:flex-row md:p-0 p-2 items-center">
          <img src={constructionSVG.src} alt="Under construction" className="w-[50vw]" />
          <div className="md:ml-5 mt-10 font-poppins md:block flex md:items-start items-center md:flex-row flex-col">
            <p className="text-primary text-2xl font-bold mb-3">Page Under Construction</p>
            <p className="text-primary text-center md:text-start">Aww snap :(((</p>
            <p className="text-primary text-center md:text-start mt-2">
              The page you are looking for is currently under construction. <br />
              Hold back, we are working on making it live{" "}
            </p>
            <Link href="/">
              <Button content="" className="bg-primary text-white p-3 rounded-lg mt-5 text-sm">
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
