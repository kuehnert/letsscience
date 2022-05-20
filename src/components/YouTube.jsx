import React from "react"

const YouTube = ({ src }) => {
  return (
    <div className="youtube-video-container">
      <iframe
        title={`YouTube video container: ${src}`}
        width="560"
        height="315"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default YouTube
