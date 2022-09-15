import { Grid } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { graphql } from "gatsby"
import React from "react"
import EntryCard from "../components/EntryCard"
import Layout from "../layout/Layout"
import colorMap from "../utils/colorMap"

const BlogIndex = ({ data }) => {
  useDocumentTitle("Blog")

  const { edges: posts } = data.allContentfulBlogPost

  return (
    <Layout>
      <Grid>
        {posts.map(
          (post, index): JSX.Element => (
            <Grid.Col xs={12} sm={6} key={index}>
              <EntryCard
                author={{
                  name: post.node.author,
                  description: post.node.school,
                }}
                image={
                  post.node.previewImageURL?.localFile.childImageSharp.fluid
                    .srcWebp
                }
                title={post.node.title}
                category={post.node.tags}
                slug={post.node.slug}
                colorMap={colorMap(posts)}
              />
            </Grid.Col>
          )
        )}
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
