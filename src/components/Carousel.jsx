import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"

const Carousel = ({ images }) => {
  return (
    <Splide
      options={{
        perMove: 1,
        perPage: 2,
        breakpoints: {
          480: {
            perPage: 1,
          },
        },
      }}
    >
      {images.map(({ gatsbyImageData }, index) => (
        <SplideSlide key={index}>
          <GatsbyImage imgClassName="image" image={gatsbyImageData} />
        </SplideSlide>
      ))}
    </Splide>
  )
}

export default Carousel
