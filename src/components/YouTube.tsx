import { LoadingOverlay } from "@mantine/core"
import React, { useState } from "react"

const YouTube = ({ src }) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="youtube-video-container">
      <LoadingOverlay visible={loading} />
      <iframe
        title={`YouTube video container: ${src}`}
        width="560"
        height="315"
        src={src}
        onLoad={() => setLoading(false)}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default YouTube
