const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')

module.exports = withPlugins(
  [
    withCss,
    [withStylus, {
      cssModules: true,
      stylusLoaderOptions: {
        use: [
          poststylus([
            autoprefixer()
          ])
        ]
      }
    }]
  ]
)
