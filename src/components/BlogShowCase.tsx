import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Grid, Title } from "@mantine/core"
import EntryCard from "./EntryCard"
import colorMap from "../utils/colorMap"
import Timeline from "./Timeline"

const BlogShowcase: React.FC = () => {
  const {
    allContentfulBlogPost: { edges: posts },
  } = useStaticQuery(graphql`
    query BlogShowCase {
      allContentfulBlogPost(
        filter: { node_locale: { eq: "en-GB" } }
        sort: { fields: publishedOn, order: DESC }
        limit: 2
      ) {
        ...postFragment
      }
    }
  `)

  const maxTitleLength = Math.max(...posts.map(post => post.node.title.length))

  return (
    <>
      <Title order={2}>Latest Blog Articles </Title>
      <Grid mt={"xs"}>
        {posts.map((post, index) => (
          <Grid.Col xs={12} sm={4} key={index}>
            <EntryCard
              author={{ name: post.node.author, description: post.node.school }}
              image={
                post.node.previewImageURL?.localFile.childImageSharp.fluid
                  .srcWebp
              }
              title={(post.node.title as string).padEnd(maxTitleLength, " ")}
              category={post.node.tags}
              slug={`/blog/${post.node.slug}`}
              colorMap={colorMap(posts)}
            />
          </Grid.Col>
        ))}
        <Grid.Col sm={4}>
          <Timeline />
        </Grid.Col>
      </Grid>
    </>
  )
}

export default BlogShowcase
