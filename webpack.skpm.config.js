/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
/**
 * @Author: Rodrigo Soares <rodrigo>
 * @Date:   2017-10-28T08:09:29-07:00
 * @Project: Rename It
 * @Last modified time: 2017-11-27T16:49:24-08:00
 */
module.exports = config => {
  config.resolve.extensions = ['.sketch.js', '.js', '.jsx']
  config.module.rules.push({
    test: /\.(html)$/,
    use: [
      {
        loader: '@skpm/extract-loader',
      },
      {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href'],
          interpolate: true,
        },
      },
    ],
  })
  config.module.rules.push({
    test: /\.(css)$/,
    use: [
      {
        loader: '@skpm/extract-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  })
  config.module.rules.push({
    test: /\.(svg)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "svg-react-loader"
      },
    ],
  })
}
