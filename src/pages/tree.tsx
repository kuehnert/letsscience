
import React from "react"
import Layout from "../layout/Layout"
import { useDocumentTitle } from "@mantine/hooks"
import TreeGen from "../components/tree"

const TreePage = () => {
  useDocumentTitle("Tree generation")

  return (
    <Layout>
        <TreeGen />
    </Layout>
  )
}

export default TreePage
