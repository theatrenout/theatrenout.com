module.exports = {
  siteMetadata: {
    title: 'Théâtre Nout',
    siteUrl: 'https://www.theatrenout.com/',
    titleSeparator: ' ✴ ',
    description: 'Petit écrin qui vous emmène dans son univers oriental, situé à Argent-sur-Sauldre dans le Cher, le Théâtre Nout et son équipe sont prêts à vous accueillir à bras ouverts.',
    company: {
      fullName: 'Compagnie Internationale du Théâtre Nout',
      shortName: 'CITN',
      creation: '1997-10-18',
      creator: 'Hazem El Awadly',
    },
    images: {
      inside: '/accueil.jpg',
      logo: '/theatre-nout-logo.jpg',
    },
    contact: {
      email: 'accueil@theatrenout.com',
      portable: '06 98 89 49 41',
      socialUsername: 'theatrenout',
      facebook: 'https://www.facebook.com/pages/Th%C3%A9%C3%A2tre-Nout/121789434510665',
      youtube: 'https://www.youtube.com/channel/UCRYte5IjrIGlKYY64qIRDLw',
      newsletter: 'http://tinyletter.com/theatrenout',
    },
    address: {
      street: '3 rue Nationale',
      city: 'Argent-sur-Sauldre',
      postalCode: '18410',
      country: 'FR',
      latitude: '47.561371',
      longitude: '2.447655',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `galleries`,
        path: `${__dirname}/content/galleries/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `spectacles`,
        path: `${__dirname}/content/spectacles/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images/`,
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#1e2c88`,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Théâtre Nout",
        short_name: "Théâtre Nout",
        start_url: "/",
        background_color: "#1e2c88",
        theme_color: "#1e2c88",
        display: "standalone",
        icon: "src/webapp-icon.png",
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
  ],
}
