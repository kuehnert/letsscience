import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../layout/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import renderBulmaRichText from "../utils/renderRichText"
import { Helmet } from "react-helmet"

interface Props {
  data: any
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const posts = data.allContentfulBlogPost.edges
  const engPost = posts.filter(
    ({ node: { node_locale } }) => node_locale == "en-GB"
  )[0]
  const [post, setPost] = useState(engPost.node)

  const setLocale = locale => {
    setPost(posts.filter(({ node }) => node.node_locale == locale)[0].node)
    localStorage.setItem("letsscience_locale", locale)
  }

  const isAvailable = locale => {
    let res = posts.filter(({ node }) => node.node_locale == locale)
    if (res.length > 0 && res[0].node.title != post.title) {
      return true
    }
    return false
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
    let letsccience_locale = localStorage.getItem("letsccience_locale") != null
    if (letsccience_locale != null && isAvailable(letsccience_locale)) {
      setLocale(letsccience_locale)
    }
  }, [])

  console.log(listLocales())

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
      {listLocales().length > 0 && (
        <div className="notification">
          This article is available in the following languages:
          <ul>{listLocales()}</ul>
        </div>
      )}

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
                  childrenImageSharp {
                    gatsbyImageData
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
                  gatsbyImageData
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
