const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports =function (webpackEnv) {
  // other webpack configurations...

//  target: 'web', // Set the target to 'web' for browser bundling
//  externals: [nodeExternals()], // Exclude Node.js core modules from bundling
  return {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      fs: false, 
      "net": false,
      "path":false,
      process:false,
      buffer:false,
      zlib: require.resolve('browserify-zlib'),
      url: require.resolve('url/'),
    },
    alias: {
      process: "process/browser"
  },
  },
 


  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
  
    })
],

};


};
