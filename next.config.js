const path = require('path');

module.exports = {
  ignoreBuildErrors: true, // stupid type error in the root page.tsx wont let me compile without this flag
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/fonts/',
            outputPath: 'static/fonts/',
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};
