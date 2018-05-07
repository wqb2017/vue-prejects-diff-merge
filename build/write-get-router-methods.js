var fs = require('fs');
var path = require('path');
var config = require('../config');

var dev = `export default file => require('@/standard/views/' + file + '/index.vue');\r\n`;
var prod = `export default file => () => import('@/standard/views/' + file + '/index.vue');\r\n`;
var method = `"${process.env.NODE_ENV}"` === config.build.env.NODE_ENV ? prod : dev;
fs.writeFileSync(path.join(__dirname, '../src/standard/router/_import.js'), method);
