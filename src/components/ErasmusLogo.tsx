import { navigate } from "gatsby"
import { Image, ImageProps } from "@mantine/core"
import React from "react"

const ErasmusLogo: React.FC<JSX.IntrinsicAttributes & ImageProps> = props => {
  return (
    <div>
      <Image
        src="/smallLogo.webp"
        radius={"md"}
        height={50}
        fit="contain"
        onClick={() => navigate("/")}
        {...props}
      />
    </div>
  )
}

export default ErasmusLogo
