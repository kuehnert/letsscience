import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import React from "react"

const renderBulmaRichText = (document) => {
    const options =  {
    renderNode: {
        "embedded-asset-block": node => {
            const { gatsbyImageData } = node.data.target
            if (!gatsbyImageData) {
                return null
            }
            return <GatsbyImage image={gatsbyImageData} />
        }
    }
    }

    return renderRichText(document, options)
}

export default renderBulmaRichText