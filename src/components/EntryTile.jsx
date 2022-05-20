import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import TextTruncate from "react-text-truncate"

const EntryTile = ({ classNames, node, truncateLines, showPreviewImage }) => {
  return (
    <a
      className={`tile ${classNames}`}
      href={`/blog/${node.slug}`}
    >
      <p className="title is-5" >{node.title}</p>
      {showPreviewImage && (
        <GatsbyImage
          imgClassName="image"
          aspectRatio={4 / 3}
          image={node.previewImageURL.localFile.childImageSharp.gatsbyImageData}
        />
      )}
      {!showPreviewImage && (
        <p className="subtitle is-6">
          <TextTruncate line={truncateLines || 3} text={node.fields.plain} />
        </p>
      )}
    </a>
  )
}

export default EntryTile
