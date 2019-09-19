/** DEPENDENCIES */
const { join } = require('path');
const prodConfig = require('./webpack.config');

/** HELPERS */
const app = path => join(__dirname, '../', path);

module.exports = {
    ...prodConfig,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: app('renderer/tsconfig.dev.json'),
                    transpileOnly: true
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    }
}