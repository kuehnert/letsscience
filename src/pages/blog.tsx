import { Grid } from "@mantine/core"
import { graphql } from "gatsby"
import React from "react"
import EntryCard from "../components/EntryCard"
import Layout from "../layout/Layout"

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allContentfulBlogPost

  return (
    <Layout>
      <Grid>
        {posts.map((post, index) => (
          <Grid.Col xs={12} sm={6}>
            <EntryCard
              key={index}
              author={{ name: post.node.author, description: post.node.school }}
              image={post.node.previewImageURL?.url}
              category={"BlogArticle"}
              title={post.node.title}
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
