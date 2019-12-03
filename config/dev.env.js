'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://49.234.229.202:8088"' // 正式新
	BASE_API: '"https://xiaolvlan.walongkeji.com/"' // 正式新

})
