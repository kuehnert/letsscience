import classNames from "classnames"
import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { MDXProvider } from "@mdx-js/react"
import YouTube from "../components/YouTube"
import "./layout.scss"
import "bulma/css/bulma.css"

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  )

  const { title, menuLinks, description } = data.site.siteMetadata

  const components = { YouTube }

  const NavLink = ({ label, to }: { label: string; to: string }) => {
    return (
      <Link className="navbar-item" to={to}>
        {label}
      </Link>
    )
  }

  return (
    <div className="container">
      <div className="application m-6">
        <Helmet htmlAttributes={{ lang: "en" }}>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href="https://letsscience.eu/" />
        </Helmet>

        <div className="main box">
          <header className="mt-0">
            <nav
              className="navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <Link to="/" id="brand" className="navbar-item">
                  Letʼs Science!
                </Link>

                <a
                  role="button"
                  onClick={() => setShowMenu(!showMenu)}
                  className="navbar-burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarMenu"
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div
                id="navbarMenu"
                className={classNames("navbar-menu", { "is-active": showMenu })}
              >
                <div className="navbar-start">
                  {menuLinks.map(l => (
                    <NavLink key={l.link} label={l.name} to={l.link} />
                  ))}
                </div>
              </div>
            </nav>
          </header>

          <div className="container">
            <MDXProvider components={components}>{children}</MDXProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
