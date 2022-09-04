import { navigate } from "gatsby"
import { Image } from "@mantine/core"
import React from "react"

const ErasmusLogo: React.FC = () => {
  return (
    <Image
      src="/logo.png"
      radius={"md"}
      height={50}
      fit="contain"
      onClick={() => navigate("/")}
    />
  )
}

export default ErasmusLogo
