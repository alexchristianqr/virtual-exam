'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
require('dotenv').config()

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ROOT_API_LARAVEL: process.env.ROOT_API_LARAVEL_DEV,
  ROOT_API_NODEJS: process.env.ROOT_API_NODEJS_DEV
})
