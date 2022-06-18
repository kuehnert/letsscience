const {
  documentToPlainTextString,
} = require("@contentful/rich-text-plain-text-renderer")
const path = require(`path`)
const { node } = require("prop-types")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "ContentfulBlogPost" && node.content != null) {
    const text = documentToPlainTextString(JSON.parse(node.content.raw))
    createNodeField({ node, name: "plain", value: text })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const webPages = await graphql(`
    {
      allContentfulWebPage {
        edges {
          node {
            slug
            contentful_id
          }
        }
      }
    }
  `)

  const blogPages = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug
            contentful_id
          }
        }
      }
    }
  `)

  const reviews = await graphql(`
    {
      allContentfulReview {
        edges {
          node {
            slug
            contentful_id
          }
        }
      }
    }
  `)

  webPages.data.allContentfulWebPage.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve("./src/templates/Page.tsx"),
      context: {
        contentful_id: node.contentful_id,
      },
    })
  })

  blogPages.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    ;[node.slug, node.contentful_id].forEach(slug => {
      createPage({
        path: "blog/" + slug,
        component: path.resolve("./src/templates/BlogEntry.tsx"),
        context: {
          contentful_id: node.contentful_id,
        },
      })
    })
  })

  reviews.data.allContentfulReview.edges.forEach(({ node }) => {
    ;[node.slug, node.contentful_id].forEach(slug => {
      createPage({
        path: "review/" + slug,
        component: path.resolve("./src/templates/Review.tsx"),
        context: {
          contentful_id: node.contentful_id,
        },
      })
    })
  })
}
