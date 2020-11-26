const path = require('path');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const projectPath = path.join(__dirname, 'public');

  const config = {
    mode: options.mode,
    devtool: isProduction ? false : 'source-map',
    entry: {
      main: './src/main.js',
    },
    output: {
      path: projectPath,
      filename: 'bundle.js',
    },
    watch: !isProduction,
    devServer: {
      contentBase: projectPath,
      watchContentBase: true,
      port: 8000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    resolve: {
        extensions: ['.js']
    },
  }

  return config;
}
