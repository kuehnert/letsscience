import { Grid } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { graphql } from "gatsby"
import React from "react"
import EntryCard from "../components/EntryCard"
import Layout from "../layout/Layout"

const colors = ["teal", "grape", "violet", "indigo", "cyan",  "red", "green", "lime", "yellow", "pink", "orange"]

const BlogIndex = ({ data }) => {

  useDocumentTitle("Blog")

  const { edges: posts } = data.allContentfulBlogPost

  // Get every unique category
  const categories = [... new Set(posts.flatMap(post => post.node.tags))].filter(x => x !== null)
  // Create a map, which maps each category to a color
  const colorMap = (() => {
    const res = {}
    categories.forEach((category, i) => {
      res[category as string] = colors[i % colors.length]
    })
    return res
  })()
  

  return (
    <Layout>
      <Grid>
        {posts.map((post, index) => (
          <Grid.Col xs={12} sm={6} key={index}>
            <EntryCard
              author={{ name: post.node.author, description: post.node.school }}
              image={
                post.node.previewImageURL?.localFile.childImageSharp.fluid.srcWebp
              }
              title={post.node.title}
              category={post.node.tags}
              slug={post.node.slug}
              colorMap={colorMap}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query blogIndex {
    allContentfulBlogPost(
      filter: { node_locale: { eq: "en-GB" } }
      sort: { fields: publishedOn, order: DESC }
    ) {
      ...postFragment
    }
  }
`

export default BlogIndex
