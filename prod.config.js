/**
@license
MIT License

Copyright (c) 2019 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/index.html", to: "." }
    ]),
    new WebpackPwaManifest({
      filename: "manifest.json",
      orientation: "portrait",
      display: "standalone",
      start_url: "/",
      crossorigin: null,
      inject: true,
      fingerprints: false,
      ios: true,
      publicPath: null,
      includeDirectory: false,
      name: "My Progressive Web App",
      short_name: "MyPWA",
      description: "My awesome Progressive Web App!",
      background_color: "#ffffff",
      theme_color: "#3f51b5",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      ios: {
        "apple-mobile-web-app-title": "AppTitle",
        "apple-mobile-web-app-status-bar-style": "black"
      },
      icons: [
        {
          src: path.resolve("src/assets/icons/ios-icon.png"),
          sizes: [16, 32, 48, 72, 96, 144, 192],
          destination: path.join("icons"),
          ios: true
        },
        {
          src: path.resolve("src/assets/icons/ios-icon.png"),
          size: 1024,
          destination: path.join("icons"),
          ios: "startup"
        }
      ],
      ios: {
        "apple-mobile-web-app-title": "AppTitle",
        "apple-mobile-web-app-status-bar-style": "black"
      }
    }),
    new GenerateSW({
      swDest: "service-worker.js",
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "index.html"
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("static/cropped-favicon.png"),
      suppressSuccess: true
    })
  ]
};
