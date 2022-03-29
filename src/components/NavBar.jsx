import classNames from "classnames"
import { graphql, StaticQuery, Link } from "gatsby"
import React, { useState } from "react"

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const NavLink = ({ label, to }) => {
    return (
      <Link className="navbar-item" to={to}>
        {label}
      </Link>
    )
  }

  const addBlog = data => {
    let navBar = data.allContentfulNavigation.edges[0].node.navigationBar

    // Prevents React from adding Blog on every render
    if (navBar.filter(x => x.slug === "blog").length < 1) {
      navBar.splice(1, 0, { slug: "blog", shortTitle: "Blog" })
    }
    return navBar.map(({ slug, shortTitle }, index) => (
      <NavLink
        label={shortTitle}
        to={(slug === "/" ? "" : "/") + slug}
        key={index}
      />
    ))
  }

  return (
    <StaticQuery
      query={graphql`
        query MyQuery {
          allContentfulNavigation {
            edges {
              node {
                navigationBar {
                  slug
                  shortTitle
                }
              }
            }
          }
        }
      `}
      render={data => (
        <header className="mt-0 mb-2">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link to="/" id="brand" className="navbar-item pl-0">
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
              <div className="navbar-start">{addBlog(data)}</div>
            </div>
          </nav>
        </header>
      )}
    />
  )
}

export default NavBar
