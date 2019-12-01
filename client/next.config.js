const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')
const withTM = require('next-transpile-modules')

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
    }],
    [withTM, {
      transpileModules: ['antd']
    }]
  ]
)
