import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText as gatsbyRenderRichText } from "gatsby-source-contentful/rich-text"
import { retrieveImageData, retrieveUrl } from "./queryUtils"
import React from "react"
import YouTube from "../components/YouTube"

const renderRichText = document => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const gatsbyImageData = retrieveImageData(node.data.target)

        if (gatsbyImageData) {
          return (
            <GatsbyImage
              imgClassName="image"
              // TODO: Implement an alt attribute
              alt=""
              className="ml-auto mr-auto"
              image={gatsbyImageData}
            />
          )
        }

        return null
      },
      "embedded-entry-block": node => {
        const target = node.data.target

        if (!target.internal) {
          return
        }

        switch (target.internal.type) {
          case "ContentfulEmbeddedVideo":
            const url = retrieveUrl(target)
            return <YouTube src={url} />
          case "ContentfulImageCarousel":
            // TODO: use Mantine Carousel
            return <></>
          default:
            console.log(`Unexpected internal type: ${target.internal.type}`)
        }
      },
    },
  }

  return gatsbyRenderRichText(document, options)
}

export default renderRichText
