import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import "./layout.css"
import "bulma/css/bulma.css"
import NavBar from "../components/NavBar"

const Layout = ({ children }) => {
  return (
    <div className="container">
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
