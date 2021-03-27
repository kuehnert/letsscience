import classNames from "classnames"
import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
// import header from "./header2.jpg"
import "./layout.scss"

export default function Layout({ children }) {
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://letsscience.eu/" />
        <html lang="en" />
      </Helmet>

      <header>
        <Link to="/" id="brand" className="siteTitle">
          Letʼs Science Our Environment!
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
