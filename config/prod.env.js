'use strict'
require('dotenv').config()

module.exports = {
	NODE_ENV:  '"production"',
  ROOT_API_LARAVEL: process.env.ROOT_API_LARAVEL_PROD,
  ROOT_API_NODEJS: process.env.ROOT_API_NODEJS_PROD
}