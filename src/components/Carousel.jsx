import React, { useEffect } from "react"
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js"
import { GatsbyImage } from "gatsby-plugin-image"

const Carousel = ({ images }) => {
  useEffect(() => {
    bulmaCarousel.attach(".carousel", {
      slidesToScroll: 1,
      slidesToShow: 2,
    })
  }, bulmaCarousel)

  return (
    <section className="section" style={{ overflow: "hidden" }}>
      <div className="container">
        <div className="carousel">
          {images.map(({ gatsbyImageData }, index) => (
            <div key={index}>
              <GatsbyImage imgClassName="image" image={gatsbyImageData} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
