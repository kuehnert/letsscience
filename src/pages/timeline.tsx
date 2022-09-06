import { Timeline, Text, Stack } from "@mantine/core"
import { IconCalendarEvent, IconCheck } from "@tabler/icons"
import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../layout/Layout"

const TimelinePage = ({ data }) => {
  const getDate = (item: any) => {
    const date = item.date
    if (date !== null && date !== undefined) {
      return date
    }
    const blogArticle = item.associatedBlogArticle
    if (blogArticle !== null && blogArticle !== undefined) {
      return blogArticle.publishedOn
    }
    return ""
  }

  const items = data.allContentfulTimelineItem.edges
    .map(k => k.node)
    .sort((a, b) => new Date(getDate(a)) - new Date(getDate(b)))

  const getDateFromItems = (i: number) => {
    return getDate(items[i])
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
                  <Text color="dimmed" size="sm" variant="link" component="span" inherit>
                    <Link to={`/blog/${item.associatedBlogArticle.slug}`}>
                      <Text>
                        {item.associatedBlogArticle.title}
                      </Text>
                    </Link>
                  </Text>
              )}
              <Text size="xs" mt={4}>
                {getDate(ind)}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Stack>
    </Layout>
  )
}

export const query = graphql`
  query timeline {
    allContentfulTimelineItem(filter: { node_locale: { eq: "en-GB" } }) {
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
