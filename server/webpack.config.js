const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const isDevBuild = true;

module.exports = {
    target: 'node',
    devtool: isDevBuild ? 'source-map' : 'hidden-source-map',
    mode: isDevBuild ? 'development' : 'production',
    // externals: [nodeExternals()],
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    entry: {
        'main': ['./src/index.ts'],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: [/src/],
            exclude: /node_modules/,
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    silent: true,
                    configFileName: './tsconfig.json',
                    useBabel: true,
                    babelCore: "@babel/core",
                    babelOptions: {
                        babelrc: false,
                        presets: [
                            ["@babel/preset-env", {
                                "targets": {
                                    "node": "current"
                                },
                                "modules": false
                            }]
                        ]
                    },
                },
            }]
        }]
    },
    output: {
        publicPath: "/",
        filename: '[name].js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"',
            'process.env.FLUENTFFMPEG_COV': false
        })
    ]
};