import { renderRichText as gatsbyRenderRichText } from "gatsby-source-contentful/rich-text"
import { retrieveUrl } from "./queryUtils"
import React from "react"
import YouTube from "../components/YouTube"
import { Image } from "@mantine/core"
import { Carousel } from "@mantine/carousel"

const renderRichText = document => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const url = node.data.target.localFile.childImageSharp.fluid.srcWebp

        if (url) {
          return <Image src={url} />
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
            const images = target.images.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image src={image.localFile.childImageSharp.fluid.srcWebp} />
              </Carousel.Slide>
            ))
            return (
              <Carousel slideSize="70%" slideGap="md" loop withIndicators>
                {images}
              </Carousel>
            )
          default:
            console.log(`Unexpected internal type: ${target.internal.type}`)
        }
      },
    },
  }

  return gatsbyRenderRichText(document, options)
}

export default renderRichText
