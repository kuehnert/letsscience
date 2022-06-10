import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import "./layout.css"
import "bulma/css/bulma.css"
import NavBar from "../components/NavBar"
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <Helmet>
          <link rel="canonical" href="https://letsscience.eu/" />
        </Helmet>
        <div className="application responsive-margin">
          <div className="main box">
            <NavBar />
            <div className="container content">{children}</div>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ height: "50px" }}>
        <div className="columns">
          <div className="column is-half">
            <figure className="image">
              <img
                src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
                style={{ height: "30px" }}
              />
            </figure>
          </div>
          <div className="column has-text-centered">
            <a href="https://github.com/kuehnert/letsscience">Source Code</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
