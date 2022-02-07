import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../layout/Layout"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const post = data.mdx

  return (
    <Layout>
      <h1 className="title">{post.frontmatter.title}</h1>
      <h2 className="subtitle is-6">
        {post.frontmatter.author}
        {post.frontmatter.date ? " - " + post.frontmatter.date : ""}
      </h2>

      <MDXRenderer>{post.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        author
        date
      }
    }
  }
`

export default BlogPost
