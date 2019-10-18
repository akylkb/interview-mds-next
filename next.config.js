require('dotenv').config()

module.exports = {
  // target: 'serverless',
  // exportPathMap: function() {
  //   return {
  //     '/': { page: '/' }
  //   };
  // },
  env: {
    APP_URL: process.env.APP_URL
  }
}
