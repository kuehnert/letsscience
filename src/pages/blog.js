import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import EntryLink from "../components/EntryLink"
import Layout from "../layout/Layout"

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allContentfulBlogPost

  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      {posts.map(({ node: post }) => {
        return <EntryLink post={post} />
      })}
    </Layout>
  )
}

export const query = graphql`
  query blogIndex {
    allContentfulBlogPost(
      filter: { node_locale: { eq: "en-GB" } }
      sort: { fields: publishedOn, order: DESC }
    ) {
      ...postFragment
    }
  }
`

export default BlogIndex
