import { Timeline, Text, Stack } from "@mantine/core"
import { IconCalendarEvent, IconCheck } from "@tabler/icons"
import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../layout/Layout"

const TimelinePage = ({ data }) => {
  const items = data.allContentfulTimelineItems.edges.map(k => k.node)

  const getDate = (i: number) => {
    const date = items[i].date
    if (date !== null && date !== undefined) {
      return date
    }
    const blogArticle = items[i].associatedBlogArticle
    if (blogArticle !== null && blogArticle !== undefined) {
      return blogArticle.publishedOn
    }
    return ""
  }

  return (
    <Layout>
      <Stack justify="center" align="center">
      <Timeline>
        {items.map((item, ind) => (
          <Timeline.Item
            key={ind}
            bullet={
              item.icon === "Event" ? (
                <IconCalendarEvent size={12} />
              ) : (
                <IconCheck size={12} />
              )
            }
            title={item.title}
          >
            {item.associatedBlogArticle !== null && (
                <Text color="dimmed" size="sm">
                  Relevant blog article:
                  <Text variant="link" component="span" inherit>
                    <Link to={`/blog/${item.associatedBlogArticle.slug}`}>
                    {" " + item.associatedBlogArticle.title}
                    </Link>
                  </Text>
                </Text>
            )}
            <Text size="xs" mt={4}>{getDate(ind)}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
      </Stack>
    </Layout>
  )
}

export const query = graphql`
  query timeline {
    allContentfulTimelineItems(
      sort: { fields: associatedBlogArticle___publishedOn }
      filter: { node_locale: { eq: "en-GB" } }
    ) {
      edges {
        node {
          title
          associatedBlogArticle {
            slug
            title
            publishedOn
          }
          icon
          date
        }
      }
    }
  }
`

export default TimelinePage
