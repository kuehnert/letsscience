import { Timeline, Text, Stack } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { IconCalendarEvent, IconCheck } from "@tabler/icons"
import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import Layout from "../layout/Layout"

const TimelinePage = () => {
  useDocumentTitle("Timeline")

  const data = useStaticQuery(graphql`
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
  `)

  const parseDate = (date: string): Date => {
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})(T\d{2}:\d{2})?$/
    const [, year, month, day] = datePattern.exec(date)!
    return new Date(`${month}, ${day} ${year}`)
  }

  const getDateString = (item: any) => {
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

  const getDate = (item: any): Date => {
    return parseDate(getDateString(item))
  }

  const items: Array<any> = data.allContentfulTimelineItem.edges
    .map(k => k.node)
    .sort((a, b) => getDate(a) - getDate(b))
    .slice(-4)

  const getDateFromItems = (i: number): Date => {
    return getDate(items[i])
  }

  const isPassed = (item: any): boolean => {
    const date = getDate(item)
    const today = new Date()
    return today > date
  }

  const getActiveItems = (): number => {
    return items.filter(item => isPassed(item)).length
  }

  return (
    <Stack justify="center" align="center" style={{ height: "100%" }}>
      <Timeline active={getActiveItems() - 1} bulletSize={24} lineWidth={2}>
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
              <Text
                color="dimmed"
                size="sm"
                variant="link"
                component="span"
                inherit
              >
                <Link
                  to={`/blog/${item.associatedBlogArticle.slug}`}
                  className={"solidLink"}
                >
                  <Text>{item.associatedBlogArticle.title}</Text>
                </Link>
              </Text>
            )}
            <Text size="xs" mt={4}>
              {getDateFromItems(ind).toDateString()}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  )
}

export default TimelinePage
