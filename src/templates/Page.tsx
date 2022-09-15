import { Title, TypographyStylesProvider } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { graphql } from "gatsby"
import React from "react"
import HeroBanner from "../components/HeroBanner"
import BlogShowCase from "../components/BlogShowCase"
import Layout from "../layout/Layout"
import renderRichText from "../utils/renderRichText"

interface Props {
  data: any
}

const InnerPage: React.FC<Props> = ({ data }) => {
  const post = data.allContentfulWebPage.edges[0].node
  useDocumentTitle(post.title)

  return (
    <>
      {post.slug === "/" && <HeroBanner />}

      {post.slug !== "/" && <Title>{post.title}</Title>}

      {post.slug === "/" && <BlogShowCase />}

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
                  childImageSharp {
                    fluid {
                      srcWebp
                    }
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
        tags
        slug
        content {
          raw
        }
        fields {
          plain
        }
        previewImageURL {
          localFile {
            childImageSharp {
              fluid {
                srcWebp
              }
            }
          }
        }
      }
    }
  }
`

export default Page
