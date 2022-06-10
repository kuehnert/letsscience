import React from "react"
import "./layout.css"
import "bulma/css/bulma.css"
import NavBar from "../components/NavBar"
import { Helmet } from "react-helmet"
import Footer from "../components/Footer"

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Helmet>
        <link rel="canonical" href="https://letsscience.eu/" />
      </Helmet>
      <div className="application responsive-margin">
        <div className="main box">
          <NavBar />
          <div className="container content">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
