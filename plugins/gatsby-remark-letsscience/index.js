const visit = require("unist-util-visit-parents")

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "heading", (node, ancestors) => {
    let { depth } = node
    let mt = depth === 3 ? "mt-5" : ""
    let mb = ""

    const parent = ancestors[ancestors.length - 1]
    const nodeIndex = parent.children.indexOf(node)
    if (nodeIndex != parent.children.length - 1) {
      const sibling = parent.children[nodeIndex + 1]

      if (sibling.type == "heading" && sibling.depth == "4") {
        sibling.data = {
          hProperties: { class: `subtitle` },
        }
      }

      if (
        sibling.type == "paragraph" &&
        sibling.children.length == 1 &&
        sibling.children[0].type == "emphasis"
      ) {
        mb = "mb-0"
      }
    }

    if (node.data == undefined) {
      // Checks that the heading isn't a subtitle
      node.data = { hProperties: { class: "title" } }
    }

    node.data.hProperties.class += ` is-size-${depth + 1} ${mt} ${mb}`
  })

  visit(markdownAST, "blockquote", (node, ancestors) => {
    const div = {
      type: "section",
      data: {
        hName: "div",
        hProperties: { class: "content" },
      },
      children: [node],
    }
    const parent = ancestors[ancestors.length - 1]
    const startIndex = parent.children.indexOf(node)
    parent.children.splice(startIndex, 1, div)
  })

  visit(markdownAST, "list", (node, ancestors) => {
    const div = {
      type: "section",
      data: {
        hName: "div",
        hProperties: { class: "content" },
      },
      children: [node],
    }
    const parent = ancestors[ancestors.length - 1]
    const startIndex = parent.children.indexOf(node)
    parent.children.splice(startIndex, 1, div)
  })

  visit(markdownAST, "paragraph", (node, ancestors) => {
    const parent = ancestors[ancestors.length - 1]

    if (parent.type === "root") {
      node.data = {
        hProperties: { class: "content" },
      }
    }
  })

  return markdownAST
}
