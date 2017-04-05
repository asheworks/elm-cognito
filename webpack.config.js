module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: './cognito',
  // Place output files in `./dist/cognito.js`
  output: {
    path: 'dist',
    filename: 'cognito.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};