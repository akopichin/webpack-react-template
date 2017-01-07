'use strict'

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

// multiple extract instances
let extractCSS = new ExtractTextPlugin('styles/app.css');

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: {
		'app': ['./app/app', './styles/app.scss']
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
	},

	watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

	devtool: NODE_ENV === 'development' ? 'source-map' : null,

	module: {
		loaders: [
            {
                test: /\.scss$/,
                // "style-loader", "css-loader", 
                //loader: ExtractTextPlugin('style-loader!css-loader!sass-loader')
                loader: extractCSS.extract(['css','sass'])
            },
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components)/,
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0', 'react']
				}
			},
            {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
		]
	},

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        extractCSS
        //new ExtractTextPlugin('[name].[ext]')
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js']
    }
}

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            // don't show unreachable variables etc
            warnings:     false,
            drop_console: true,
            unsafe:       true
          }
        })
    );
}
