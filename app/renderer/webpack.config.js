/** DEPENDENCIES */
const { join } = require('path');

/** HELPERS */
const app = path => join(__dirname, '../', path);

module.exports = {
    mode: 'production',
    entry: {
        exec: app('renderer/components/App/App.tsx')
    },
    output: {
        filename: '[name].js',
        path: app('assets/js')
    },
    target: 'electron-renderer',
    resolve: {
        extensions: ['.ts','.tsx','.js','.json']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                configFile: app('renderer/tsconfig.json')
            }
        }]
    },
    stats: 'minimal'
}