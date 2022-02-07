import React from "react"
import Layout from "../layout/Layout"
import { Link, graphql } from "gatsby"

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx

  return (
    <Layout>
      {posts.map(({ node: post }) => {
        return (
          <div className="card mb-5">
            {post.frontmatter.preview != null && (
              <div className="card-image">
                <Link to={post.slug.replace("blog/", "")}>
                  <img src={post.frontmatter.preview} />
                </Link>
              </div>
            )}

            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <Link to={post.slug.replace("blog/", "")}>
                    <p className="title is-4">{post.frontmatter.title}</p>
                  </Link>
                  <p className="subtitle is-6">{post.frontmatter.author}</p>
                </div>
              </div>

              <div className="content">
                {post.excerpt}
                <br />
                <time>{post.frontmatter.date}</time>
              </div>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query blogIndex {
    allMdx(filter: { fields: { slug: { regex: "/blog/.*/" } } }) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            author
            date
            preview
          }
          slug
        }
      }
    }
  }
`

export default BlogIndex
