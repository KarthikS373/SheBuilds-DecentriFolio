import twitterSVG from "../../assets/svg/twitter.svg"

const Footer = () => {
  return (
    <footer className="relative z-30 flex flex-col justify-between bg-[#142850] py-12 px-5 text-white md:flex-row md:items-end">
      <div>
        <img src="/images/logo.png" alt="logo" className="mb-2 w-[135px]" />
        <p>Created by Team 404</p>
      </div>

      <div className="mt-20 flex flex-col items-start md:mt-0">
        <div className="mb-5 flex items-center">
          <div className="mx-3 cursor-pointer">
            <img
              src={twitterSVG.src}
              alt="pic"
              className="hover:fill-[#1da1f2]"
              width={"30px"}
              height={"30px"}
            />
          </div>
          <div className="mx-3 cursor-pointer">
            <img
              src={twitterSVG.src}
              alt="pic"
              className="hover:fill-[#1da1f2]"
              width={"30px"}
              height={"30px"}
            />
          </div>
          <div className="mx-3 cursor-pointer">
            <img
              src={twitterSVG.src}
              alt="pic"
              className="hover:fill-[#1da1f2]"
              width={"30px"}
              height={"30px"}
            />
          </div>
        </div>
        <p>Copyright © 2023 Team 404</p>
      </div>
    </footer>
  )
}

export default Footer
