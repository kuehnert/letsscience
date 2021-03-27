module.exports = {
  siteMetadata: {
    charSet: "utf-8",
    title: "Let's Science Our Environment!",
    description: "Erasmus+-Project sponsored by the E.U.",
    url: "https://letsscience.eu/",
    author: "Matthias Kühnert",
    menuLinks: [
      { name: "Our Project", link: "/" },
      { name: "Blog", link: "/blog" },
      { name: "The App", link: "/app" },
      { name: "Materials", link: "/materials" },
      { name: "Partners", link: "/partners" },
      { name: "Schools", link: "/schools" },
      { name: "Contact", link: "/contact" },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 853,
              withWebp: true,
              linkImagesToOriginal: false,
              backgroundColor: "none",
              // wrapperStyle: fluidResult =>
              //   `flex:${_.round(fluidResult.aspectRatio, 2)};`,
              // wrapperStyle: "width: 30%; margin: 16px",
            },
          },
          // "gatsby-remark-static-images",
        ],
      },
    },
  ],
};
