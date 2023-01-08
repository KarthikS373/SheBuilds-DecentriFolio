import React from "react"

import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"
import Props from "./AppLayout.types"

const AppLayout = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    if (window && window.localStorage.getItem("Authorization")) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="min-h-screen mt-30">{children}</div>
      <Footer />
    </div>
  )
}

export default AppLayout
