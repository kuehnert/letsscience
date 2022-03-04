import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import renderBulmaRichText from "../utils/renderRichText"
import { Helmet } from "react-helmet"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const post = data.allContentfulBlogPost.edges[0].node
  return (
    <Layout>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <h1 className="title">{post.title}</h1>
      <h2 className="subtitle is-6">
        {post.author}
        {post.publishedOn ? " - " + post.publishedOn : ""}
      </h2>

      {renderBulmaRichText(post.content)}
    </Layout>
  )
}

export const query = graphql`
  query ($contentful_id: String!) {
    allContentfulBlogPost(filter: { contentful_id: { eq: $contentful_id } }) {
      edges {
        node {
          contentful_id
          title
          id
          publishedOn
          author
          content {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                __typename
                localFile {
                  childrenImageSharp {
                    gatsbyImageData
                  }
                }
              }
              ... on ContentfulEmbeddedVideo {
                contentful_id
                platform
                url
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPost
