/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname)
  },
  plugins: [
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
      theme_color: "#ff0000",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      ios: {
        "apple-mobile-web-app-title": "AppTitle",
        "apple-mobile-web-app-status-bar-style": "black"
      },
      icons: [
        {
          src: path.resolve("src/assets/icons/ios-icon.png"),
          sizes: [48, 72, 96, 144, 192],
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
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("static/cropped-favicon.png"),
      suppressSuccess: true
    })
  ]
};
