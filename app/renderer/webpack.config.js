/** DEPENDENCIES */
const { join } = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HWP = require('html-webpack-plugin');

/** HELPERS */
const app = path => join(__dirname, '../', path);

/** HTML PLUGIN TEMPLATE */
const template = app('assets/__template__.html');

module.exports = (env = 'production') => ({
    mode: env === 'production' || env === 'analyze' ? 'production' : 'development',
    entry: {
        app: app('renderer/components/App/App.tsx'),
        executor: app('renderer/components/Executor/Executor.tsx')
    },
    output: {
        filename: '[name].js',
        path: app('assets')
    },
    target: 'electron-renderer',
    devtool: env !== 'production' ? 'source-map' : undefined,
    resolve: {
        extensions: ['.ts','.tsx','.js','.json'],
        alias: {
            store: app('renderer/store'),
            types: app('renderer/types'),
            utils: app('renderer/utils'),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: app('renderer/tsconfig.json'),
                    transpileOnly: env === 'development',
                    compilerOptions: env === 'development' ? { sourceMap: true } : {},
                }
            },
            ...(env === 'development' ? [{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }] : [])
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    stats: 'minimal',
    plugins: [
        ...(env === 'analyze' ? [new BundleAnalyzerPlugin()] : []),
        /** Create a html plugin for each entry point */
        new HWP({ template, chunks: ['app'], filename: 'app.html' }),
        new HWP({ template, chunks: ['executor'], filename: 'executor.html' })
    ]
});
