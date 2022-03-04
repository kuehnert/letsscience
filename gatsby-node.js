const path = require(`path`)
const { node } = require("prop-types")

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bulma-carousel/,
            use: loaders.null(),
          },
        ],
      },
    })
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
    ;["blog/" + node.slug, "blog/" + node.contentful_id].forEach(slug => {
      createPage({
        path: slug,
        component: path.resolve("./src/templates/BlogEntry.tsx"),
        context: {
          contentful_id: node.contentful_id,
        },
      })
    })
  })
}
