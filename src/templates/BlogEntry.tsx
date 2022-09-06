import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../layout/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import renderBulmaRichText from "../utils/renderRichText"
import { Helmet } from "react-helmet"
import { Title } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const posts = data.allContentfulBlogPost.edges
  const engPost = posts.filter(
    ({ node: { node_locale } }) => node_locale == "en-GB"
  )[0]
  const [post, setPost] = useState(engPost.node)

  useDocumentTitle(post.title)

  const setLocale = locale => {
    setPost(posts.filter(({ node }) => node.node_locale == locale)[0].node)
    localStorage.setItem("letsscience_locale", locale)
  }

  const isAvailable = locale => {
    let res = posts.filter(
      ({ node }) =>
        node.node_locale == locale && node.node_locale != post.node_locale
    )
    if (res.length == 0) {
      return false
    }
    res = res[0].node
    if (locale != "en-GB" && res.title == engPost.node.title) {
      return false
    }

    return true
  }

  const listLocales = () => {
    return posts
      .filter(({ node }) => isAvailable(node.node_locale))
      .map(({ node }) => (
        <li onClick={e => setLocale(node.node_locale)}>
          <a>{node.node_locale}</a>
        </li>
      ))
  }

  useEffect(() => {
    let letsccience_locale = localStorage.getItem("letsscience_locale")
    if (letsccience_locale != null && isAvailable(letsccience_locale)) {
      setLocale(letsccience_locale)
    }
  }, [])

  return (
    <Layout>
      <Title>{post.title}</Title>
      <Title order={2}>
        {" "}
        {post.author}
        {post.publishedOn ? " - " + post.publishedOn : ""}
      </Title>
      {/**
      {listLocales().length > 0 && (
        <div className="notification">
          This article is available in the following languages:
          <ul>{listLocales()}</ul>
        </div>
      )}
       */}

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
          node_locale
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
                  childImageSharp {
                    fluid {
                      srcWebp
                    }
                  }
                }
              }
              ... on ContentfulEmbeddedVideo {
                contentful_id
                platform
                url
                internal {
                  type
                }
              }
              ... on ContentfulImageCarousel {
                contentful_id
                images {
                  localFile {
                    childImageSharp {
                      fluid {
                        srcWebp
                      }
                    }
                  }
                }
                internal {
                  type
                }
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPost
