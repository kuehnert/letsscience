import React from "react"
import "./layout.css"
import NavBar from "../components/NavBar"
import { Container, Space } from "@mantine/core"
import Footer from "../components/Footer"

const links = [
  { link: "/blog", label: "Blog" },
  { link: "/timeline", label: "Timeline" },
  { link: "/app", label: "The App" },
  { link: "/partners", label: "Partners" },
  {
    link: "/schools",
    label: "Schools",
    links: [
      { link: "/schools/germany", label: "Germany" },
      { link: "/schools/denmark", label: "Denmark" },
      { link: "/schools/spain", label: "Spain" },
      { link: "/schools/portugal", label: "Portugal" },
      { link: "/schools/england", label: "England" },
    ],
  },
  { link: "/contact", label: "Contact" },
]

const Layout = ({ children }) => {
  return (
    <>
      <div id="content">
        <NavBar links={links} />
        <Container>{children}</Container>
        <Space h="xs" />
      </div>
      <Footer />
    </>
  )
}

export default Layout
