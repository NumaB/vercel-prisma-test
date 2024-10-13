import * as React from "react"
import MainMenu from "./Menu"

const FormHome = () => {
  return (
    <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
      {/* Sidebar component */}
      <MainMenu />
    </div>
  )
}
export default FormHome
