import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../layout/Layout"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const post = data.allContentfulEntry.edges[0].node
  console.log(post)

  return (
    <Layout>
      <h1 className="title">{post.title}</h1>
      <h2 className="subtitle is-6">
        {post.author}
        {post.date ? " - " + post.date : ""}
      </h2>

      <MDXRenderer>{post.content.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query ($contentful_id: String!) {
    allContentfulEntry(filter: { contentful_id: { eq: $contentful_id } }) {
      edges {
        node {
          ... on ContentfulBlogpost {
            id
            date
            author
            contentful_id
            title
            content {
              childMdx {
                body
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPost
