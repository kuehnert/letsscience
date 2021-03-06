import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/Layout"
import * as styles from "./Page.module.scss"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>

      <div
        className={styles.Markdown}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost
