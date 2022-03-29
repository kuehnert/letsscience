import { navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Truncate from "react-truncate"
import renderBulmaRichText from "../utils/renderRichText"

const EntryTile = ({ classNames, node, truncateLines, showPreviewImage }) => {
  return (
      <article className={`tile ${classNames}`} onClick={() => navigate(`/blog/${node.slug}`)}>
        <p className="title is-5">{node.title}</p>
        {showPreviewImage &&
        <GatsbyImage imgClassName="image" aspectRatio={4/3} image={node.previewImageURL.localFile.childImageSharp.gatsbyImageData} /> }
        {!showPreviewImage &&
        <p className="subtitle is-6">
          <Truncate lines={truncateLines || 3}>{renderBulmaRichText(node.content)}</Truncate>
        </p>
        }
      </article>
  )
}

export default EntryTile
