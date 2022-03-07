import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import "./layout.css"
import "bulma/css/bulma.css"
import NavBar from "../components/NavBar"
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Helmet>
        <link rel="canonical" href="https://letsscience.eu/" />
      </Helmet>
      <div className="application m-6">
        <div className="main box">
          <NavBar />
          <div className="container content">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
