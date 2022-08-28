import React from "react"
import "./layout.css"
import NavBar from "../components/NavBar"
import { Container, TypographyStylesProvider } from "@mantine/core"

const links = [
  { link: "/blog", label: "Blog" },
  { link: "/app", label: "The App" },
  { link: "/materials", label: "Materials" },
  { link: "/partners", label: "Partners" },
  { link: "/schools", label: "Schools" },
  { link: "/contact", label: "Contact" },
]

const Layout = ({ children }) => {
  return (
    <>
      <NavBar links={links} />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
