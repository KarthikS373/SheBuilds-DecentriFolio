import React from "react"

import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"
import Sidebar from "../navbar/Sidebar"
import Props from "./OrganizerLayout.types"

const OrganizerLayout = ({ children, isSidebarOpen, setIsSidebarOpen }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("Authorization")) setIsAuthenticated(true)
    }
  }, [])

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="relative flex min-h-screen justify-between">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default OrganizerLayout
