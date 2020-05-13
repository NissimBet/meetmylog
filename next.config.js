require('dotenv').config();

module.exports = {
  webpack: config => {
    config.node = {
      fs: 'empty',
      BACKEND_URI: process.env.BACKEND_URI,
    };
    return config;
  },
};
