import React from "react"

const Footer = () => {
  return (
    <div className="columns mt-6" style={{ borderTop: "2px solid #f5f5f5" }}>
      <div className="column is-half">
        <figure className="image">
          <img
            src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
            style={{ height: "30px" }}
          />
        </figure>
      </div>
      <div className="column has-text-centered">
        <a href="https://github.com/kuehnert/letsscience">Source Code</a>
      </div>
    </div>
  )
}

export default Footer
