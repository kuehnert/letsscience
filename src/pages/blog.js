import React from "react"
import Layout from "../layout/Layout"
import { Link, graphql } from "gatsby"
import Truncate from "react-truncate"
import renderBulmaRichText from "../utils/renderRichText"
import { GatsbyImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allContentfulBlogPost

  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      {posts.map(({ node: post }) => {
        return (
          <div className="card mb-5">
            {post.previewImageURL != null && (
              <div className="card-image">
                <Link to={post.slug}>
                  <GatsbyImage
                    imgClassName="image"
                    image={
                      post.previewImageURL.localFile.childImageSharp
                        .gatsbyImageData
                    }
                  />
                </Link>
              </div>
            )}

            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <Link to={post.slug}>
                    <p className="title is-4">{post.title}</p>
                  </Link>
                  <p className="subtitle is-6">
                    {post.author} - {post.school}
                  </p>
                </div>
              </div>

              <div className="content">
                <Truncate lines={1} ellipsis="&hellip;">
                  {renderBulmaRichText(post.content)}
                </Truncate>
                <br />
                <time>{post.publishedOn}</time>
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
    allContentfulBlogPost(sort: { fields: publishedOn, order: DESC }) {
      edges {
        node {
          author
          school
          contentful_id
          publishedOn
          title
          slug
          content {
            raw
          }
          previewImageURL {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

export default BlogIndex
