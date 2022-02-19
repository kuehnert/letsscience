import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { retrieveImageData } from "./queryUtils"
import React from "react"

const renderBulmaRichText = document => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const gatsbyImageData = retrieveImageData(node.data.target)
        if (!gatsbyImageData) {
          return null
        }
        return (
          <div className="columns">
            <GatsbyImage
              imgClassName="image"
              // TODO: Implement an alt attribute
              alt=""
              className="ml-auto mr-auto"
              image={gatsbyImageData}
            />
          </div>
        )
      },
    },
  }

  return renderRichText(document, options)
}

export default renderBulmaRichText
