import classNames from "classnames"
import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import "./layout.scss"

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

  const NavLink = ({ label, to }: { label: string; to: string }) => {
    return <Link to={to}>{label}</Link>
  }

  return (
    <div className="application">
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://letsscience.eu/" />
      </Helmet>

      <header>
        <Link to="/" id="brand" className="siteTitle">
          Letʼs Science Our School Environment!
        </Link>
        <Link to="/" id="brand-mobile" className="siteTitle">
          Letʼs Science!
        </Link>

        <nav>
          <div className={classNames("menu", { active: showMenu })}>
            {menuLinks.map(l => (
              <NavLink key={l.link} label={l.name} to={l.link} />
            ))}
          </div>

          <div
            id="hamburger"
            className={classNames({ active: showMenu })}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="line" id="one"></div>
            <div className="line" id="two"></div>
            <div className="line" id="three"></div>
          </div>
        </nav>
      </header>

      <div className="main">{children}</div>
    </div>
  )
}

export default Layout;
