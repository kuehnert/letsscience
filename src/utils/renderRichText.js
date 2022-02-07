import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import React from "react"

const renderBulmaRichText = document => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const { gatsbyImageData } = node.data.target
        if (!gatsbyImageData) {
          return null
        }
        return <div className="columns"><GatsbyImage className="column is-offset-one-quarter is-half" image={gatsbyImageData} /></div>
      },
    },
  }

  return renderRichText(document, options)
}

export default renderBulmaRichText
