import { TypographyStylesProvider } from "@mantine/core"
import { graphql } from "gatsby"
import React from "react"
import HeroBanner from "../components/HeroBanner"
import Layout from "../layout/Layout"
import Contact from "../pages/contact"
import renderRichText from "../utils/renderRichText"

interface Props {
  data: any
}

const InnerPage: React.FC<Props> = ({ data }) => {
  const post = data.allContentfulWebPage.edges[0].node

  if (post.slug === "contact") {
    return <Contact />
  }

  return (
    <>
      {post.slug === "/" && (
        <>
          <HeroBanner />
        </>
      )}

      {post.slug !== "/" && <h1 className="title">{post.title}</h1>}

      <TypographyStylesProvider>
        {renderRichText(post.content)}
      </TypographyStylesProvider>
    </>
  )
}

const Page: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <InnerPage data={data} />
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
      filter: { node_locale: { eq: "en-GB" } }
      sort: { fields: publishedOn, order: DESC }
    ) {
      ...postFragment
    }
  }
`
// TODO: Remove localFile from previewImageURL
export const entryFragment = graphql`
  fragment postFragment on ContentfulBlogPostConnection {
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
        fields {
          plain
        }
        previewImageURL {
          url
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1.3333)
            }
          }
        }
      }
    }
  }
`

export default Page
