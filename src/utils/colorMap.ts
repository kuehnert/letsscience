const colors = [
  "teal",
  "grape",
  "violet",
  "indigo",
  "cyan",
  "red",
  "green",
  "lime",
  "yellow",
  "pink",
  "orange",
]

const colorMap = (posts: any) => {
  // Get every unique category
  const categories = [...new Set(posts.flatMap(post => post.node.tags))].filter(
    x => x !== null
  )
  // Create a map, which maps each category to a color
  const res = {}
  categories.forEach((category, i) => {
    res[category as string] = colors[i % colors.length]
  })
  return res
}

export default colorMap
