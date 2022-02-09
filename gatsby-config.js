require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    charSet: "utf-8",
    title: "Let's Science Our Environment!",
    description: "Erasmus+-Project sponsored by the E.U.",
    url: "https://letsscience.eu/",
    author: "Matthias Kühnert",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-catch-links",
    // Fixes Contentful implementation: https://github.com/sanity-io/gatsby-source-sanity/issues/122#issuecomment-958748858
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
