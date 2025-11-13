const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Workaround for ajv dependency issues in react-scripts 5
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];
      return webpackConfig;
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
};
