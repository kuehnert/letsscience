const path = require(`path`)
const { node } = require("prop-types")

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
      }
    })
  })

  blogPages.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: "blog/" + node.contentful_id,
      component: path.resolve("./src/templates/BlogEntry.tsx"),
      context: {
        contentful_id: node.contentful_id,
      },
    })
  })
}
