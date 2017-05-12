# HTML Webpack Short Hash Plugin

Shortens the hashes added to file urls by the HTML webpack plugin.

    npm install --save-dev html-webpack-short-hash-plugin

Example:

    var HtmlWebpackShortHashPlugin = require('html-webpack-short-hash-plugin');

    {
      plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackShortHashPlugin({
          length: 8 // defaults to 6
        })
      ]
    }
