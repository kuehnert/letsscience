import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import renderBulmaRichText from "../utils/renderRichText"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const post = data.allContentfulWebPage.edges[0].node

  return (
    <Layout>
      <h1 className="title">{post.title}</h1>

      {renderBulmaRichText(post.content)}
    </Layout>
  )
}

export const query = graphql`
  query ($contentful_id: String!) {
    allContentfulWebPage(filter: { contentful_id: { eq: $contentful_id } }) {
      edges {
        node {
          content {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                __typename
                gatsbyImageData
              }
            }
          }
          title
        }
      }
    }
  }
`

export default BlogPost
