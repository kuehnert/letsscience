import React from "react"
import "./layout.css"
import NavBar from "../components/NavBar"
import { Container } from "@mantine/core"
import Footer from "../components/Footer"

const links = [
  { link: "/blog", label: "Blog" },
  { link: "/app", label: "The App" },
  { link: "/materials", label: "Materials" },
  { link: "/partners", label: "Partners" },
  { link: "/schools", label: "Schools", links: [
    { link: "/schools/germany", label: "Germany" },
  ] },
  { link: "/contact", label: "Contact" },
]

const Layout = ({ children }) => {
  return (
    <>
      <NavBar links={links} />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

export default Layout
