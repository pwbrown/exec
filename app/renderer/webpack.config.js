/** DEPENDENCIES */
const { join } = require('path');

/** HELPERS */
const app = path => join(__dirname, '../', path);

module.exports = {
    mode: 'production',
    entry: {
        app: app('renderer/components/App/App.tsx'),
        executor: app('renderer/components/Executor/Executor.tsx')
    },
    output: {
        filename: '[name].js',
        path: app('assets/js')
    },
    target: 'electron-renderer',
    resolve: {
        extensions: ['.ts','.tsx','.js','.json'],
        alias: {
            store: app('renderer/store'),
            types: app('renderer/types'),
            utils: app('renderer/utils'),
        }
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