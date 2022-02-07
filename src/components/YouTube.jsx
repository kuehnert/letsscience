import React from "react"

const YouTube = ({ src }) => {
  return (
    <div className="youtube-video-container">
      <iframe
        width="560"
        height="315"
        src={src}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  )
}

export default YouTube
