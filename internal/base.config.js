const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Config and environment.
const appConfig = require('../app.config');
const environment = require('./utils/environment');

// Plugins.
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Base webpack config.
 */
module.exports = (env, args) => {
    const IS_DEV = environment === 'development' || args.watch;

    const extractCSS = new ExtractTextPlugin({
        filename: 'css/[name].css',
        disable: IS_DEV
    });

    return merge({
        context: appConfig.sourceDir,
        entry: {
            app: 'app.tsx',
        },
        output: {
            path: appConfig.outputDir,
            publicPath: './',
            filename: 'js/[name].js',
            hotUpdateChunkFilename: "js/hot/[id].[hash].js"
        },
        resolve: {
            modules: [
                appConfig.sourceDir,
                'node_modules'
            ],
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    loader: extractCSS.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {sourceMap: IS_DEV}
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: IS_DEV,
                                    config: {
                                        path: path.join(__dirname, 'postcss.config.js'),
                                    }
                                }
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {sourceMap: IS_DEV}
                            },
                            {
                                loader: 'sass-loader',
                                options: {sourceMap: true}
                            }
                        ]
                    })
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    include: appConfig.sourceDir,
                    exclude: /node_modules/
                },
                // Process all html, fonts and images from assets to dist.
                {
                    test: /\.(html|png|jpg|svg|ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: appConfig.assetsDir,
                    }
                },
            ]
        },
        plugins: [
            // Handle css emit.
            extractCSS,
            // Combine all vendors in common chunk.
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            // Pass environment var to code.
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(environment)
            }),
        ],
        devtool: IS_DEV ? 'cheap-module-eval-source-map' : false,
        devServer: {
            contentBase: appConfig.outputDir,
            publicPath: '/'
        }
    }, (IS_DEV ? require('./dev.config') : require('./prod.config'))(env, args));
};
