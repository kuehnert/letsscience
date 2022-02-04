const path = require(`path`)
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode, basePath: "pages" })
    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        totalCount
        edges {
          node {
            fields {
              slug
            }
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
        preview {
          file {
            url
          }
          title
        }
        contentful_id
        id
        author
        date
      }
    }
  }
}
  `)

  blogPages.data.allContentfulBlogpost.edges.forEach(({ node }) => {
    createPage({
      path: "blog/" + node.preview.title,
      component: path.resolve("./src/templates/Page.tsx"),
      context: {
        contentful_id: node.contentful_id
      }
    })
  }) 


}
