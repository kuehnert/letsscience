import { graphql } from "gatsby"
import React from "react"
import Helmet from "react-helmet"
import EntryLink from "../components/EntryLink"
import EntryTiles from "../components/EntryTiles"
import Layout from "../layout/Layout"
import renderBulmaRichText from "../utils/renderRichText"

interface Props {
  data: any
}

const Page: React.FC<Props> = ({ data }) => {
  const post = data.allContentfulWebPage.edges[0].node

  return (
    <Layout>
      {post.slug === "/" && (
        <>
          <h1 className="title">Latest Blog Articles</h1>
          <div className="columns">
            <EntryTiles edges={data.allContentfulBlogPost.edges} />
          </div>
        </>
      )}

      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{post.title}</title>
      </Helmet>
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
                localFile {
                  childrenImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
          title
          slug
        }
      }
    }
    allContentfulBlogPost(
      limit: 3
      sort: { fields: publishedOn, order: DESC }
    ) {
      ...postFragment
    }
  }
`

export default Page
