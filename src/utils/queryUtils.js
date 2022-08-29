export const getNested = (obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

// https://stackoverflow.com/a/8260383
const getYouTubeId = url => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

export const retrieveUrl = ({ platform, url }) => {
  if (platform !== "YouTube") {
    return null
  }

  const id = getYouTubeId(url)

  return "https://www.youtube.com/embed/" + id
}
