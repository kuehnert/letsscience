import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../layout/Layout"
import renderBulmaRichText from "../utils/renderRichText"

interface Props {
  data: any
}

const Review: React.FC<Props> = ({ data }) => {
  const review = data.allContentfulReview.edges[0].node

  const createList = (listName, arr) => {
    return (
      <div className="column">
        <p className="has-text-weight-bold is-size-4">{listName}</p>
        <ul>
          {arr.map(e => (
            <li>{e}</li>
          ))}
        </ul>
      </div>
    )
  }

  const listProsCons = () => {
    return (
      <div className="columns notification is-info">
        {createList("Pros", review.pros)}
        {createList("Cons", review.cons)}
      </div>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>{review.productName}</title>
      </Helmet>
      <h1 className="title">{review.productName + " - Review"}</h1>
      <h2 className="subtitle is-6">
        {review.author}
        {review.publishedOn ? " - " + review.publishedOn : ""}
      </h2>
      {listProsCons()}

      {renderBulmaRichText(review.review)}
    </Layout>
  )
}

export const query = graphql`
  query ($contentful_id: String!) {
    allContentfulReview(filter: { contentful_id: { eq: $contentful_id } }) {
      edges {
        node {
          contentful_id
          node_locale
          productName
          id
          publishedOn
          author
          pros
          cons
          review {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                __typename
                localFile {
                  childrenImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export default Review
