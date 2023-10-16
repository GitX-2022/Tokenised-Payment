require('dotenv').config()

module.exports = {
  env: {
    REACT_APP_ADMIN_ADDRESS: process.env.REACT_APP_ADMIN_ADDRESS,
    REACT_APP_TOKEN_ADDRESS: process.env.REACT_APP_TOKEN_ADDRESS,
  },
};