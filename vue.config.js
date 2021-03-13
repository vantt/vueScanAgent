//const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vueScanAgent' : '/',
    assetsDir: 'assets',
    lintOnSave: false,

    configureWebpack: {
        resolve: {
        },
    }
}
