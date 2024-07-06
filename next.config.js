const path = require('path');

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
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
