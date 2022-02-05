import React from "react"
import Layout from "../layout/Layout"
import { Link, graphql } from "gatsby"

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allContentfulBlogpost

  return (
    <Layout>
      {posts.map(({ node: post }) => {
        return (
          <div className="card mb-5">
            {post.preview.file.url != null && (
              <div className="card-image">
                <Link to={post.contentful_id}>
                  <img src={post.preview.file.url} />
                </Link>
              </div>
            )}

            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <Link to={post.contentful_id}>
                    <p className="title is-4">{post.title}</p>
                  </Link>
                  <p className="subtitle is-6">{post.author}</p>
                </div>
              </div>

              <div className="content">
                {post.content.childMdx.excerpt}
                <br />
                <time>{post.date}</time>
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
  allContentfulBlogpost {
    edges {
      node {
        author
        contentful_id
        date
        content {
          childMdx {
            excerpt
          }
        }
        preview {
          file {
            url
          }
        }
      }
    }
  }
}`


export default BlogIndex
