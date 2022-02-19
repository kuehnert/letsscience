import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { retrieveImageData, retrieveUrl } from "./queryUtils"
import React from "react"
import YouTube from "../components/YouTube"

const renderBulmaRichText = document => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const gatsbyImageData = retrieveImageData(node.data.target)

        if (gatsbyImageData) {
          return <div className="columns">
            <GatsbyImage
              imgClassName="image"
              // TODO: Implement an alt attribute
              alt=""
              className="ml-auto mr-auto"
              image={gatsbyImageData}
            />
          </div>
        }

        return null
      },
      "embedded-entry-block": node => {
        const url = retrieveUrl(node.data.target)

        if (url) {
          return <YouTube src={url} />
        }
      }
    },
  }

  return renderRichText(document, options)
}

export default renderBulmaRichText
