export const getNested = (obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

export const retrieveImageData = ({ localFile }) => {
  if (!localFile) {
    return null
  }
  const data = getNested(localFile, "childrenImageSharp")
  if (data.length == 0 || !data[0].gatsbyImageData) {
    return null
  }
  return data[0].gatsbyImageData
}
