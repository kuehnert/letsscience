const path = require(`path`)
const { node } = require("prop-types")


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allContentfulPage {
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
    allContentfulBlogpost {
    edges {
      node {
        contentful_id
      }
    }
  }
}
  `)

  pages.data.allContentfulPage.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve("./src/templates/Page.tsx"),
      context: {
        contentful_id: node.contentful_id
      }
    })
  })

  blogPages.data.allContentfulBlogpost.edges.forEach(({ node }) => {
    createPage({
      path: "blog/" + node.contentful_id,
      component: path.resolve("./src/templates/BlogEntry.tsx"),
      context: {
        contentful_id: node.contentful_id
      }
    })
  }) 


}
