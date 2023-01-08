import twitterSVG from "../../assets/svg/twitter.svg"

const Footer = () => {
  return (
    <footer className="bg-[#142850] py-12 px-5 flex md:flex-row flex-col justify-between md:items-end text-white relative z-30">
      <div>
        <img src="/images/logo.png" alt="logo" className="w-[135px] mb-2" />
        <p>Created by Team 404</p>
      </div>

      <div className="flex flex-col items-start md:mt-0 mt-20">
        <div className="flex items-center mb-5">
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
