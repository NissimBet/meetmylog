require('dotenv').config();

module.exports = {
  env: {
    BACKEND_URI: process.env.BACKEND_URI,
  },
  webpack: config => {
    config.node = {
      fs: 'empty',
    };
    return config;
  },
};
