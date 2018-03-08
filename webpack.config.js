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

	watch: false, //NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

	devtool: NODE_ENV === 'development' ? 'cheap-eval-source-map' : null,

	module: {
		loaders: [
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css-loader','sass-loader'])
            },
            /*
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
            */
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
				include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
		]
	},

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            // move all node_modules to vendors bundle.
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
            filename: "vendors.bundle.js"
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        extractCSS
    ],

    resolve: {
	    modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
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
