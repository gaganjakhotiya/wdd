const path = require('path')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
        ],
        index: [
            './src/index',
        ],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
        publicPath: 'build/',
    },
    module: {
        rules: [
            {
                test: /.*\/admin\/.*\.widget\.jsx$/,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: {
                            name: 'admin',
                            lazy: true,
                        },
                    },
                ]
            },
            {
                test: /.*\/user\/.*\.widget\.jsx$/,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: {
                            name: 'user',
                            lazy: true,
                        },
                    },
                ]
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env',
                            'react',
                            'es2017',
                            'stage-2',
                        ],
                    },
                }
            },
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: [
            '.js',
            '.jsx',
        ]
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
        }),
    ],
}
