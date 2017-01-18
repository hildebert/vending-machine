var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

var validate = require('webpack-validator');
var pkg = require('./package.json');

const PATHS = {
    app: path.join(__dirname, 'src', 'index.js'),
    build: path.join(__dirname, 'dist')
};

var plugins = [];

var config = {
    entry: {
        main: PATHS.app
    },
    module: {
        loaders: [{
            test: /\.(scss|sass)$/,
            loaders: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.css$/,
            loaders: ['style', 'css', 'postcss']
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]&name=fonts/[name].[ext]'
        },{
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml&name=img/[name].[ext]'
        }],
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint',
            exclude: /node_modules/
        }]
    },
    output: {
        publicPath: '/',
        path: PATHS.build,
        filename: '[name].js'
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    eslint: {
        configFile: './.eslintrc',
        emitWarning: true
    }
};

switch (process.env.NODE_ENV) {
    case 'production':
        config.module.loaders.unshift({
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0']
            }
        });

        config.output.filename = 'js/[name].js';
        config.output.chunkFilename = 'js/.js';

        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );

        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }));

        plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));
        plugins.push(new webpack.optimize.DedupePlugin());

        plugins.push(new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }));

        config.module.loaders.filter(loader =>
            loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
        ).forEach(loader => {
            const [first, ...rest] = loader.loaders;
            loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
            delete loader.loaders;
        });

        plugins.push(new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }));

        break;

    default:
        var host = 'localhost';
        var port = 3000;
        var url = `http://${host}:${port}/`;

        config.module.loaders.unshift({
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel']
        });

        config.devtool = 'eval-source-map';
        config.output.publicPath = '/';

        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: host,
            port: port,
            publicPath: config.output.publicPath
        };

        plugins.push(new ExtractTextPlugin('[name].css', {
            allChunks: true
        }));

        plugins.push(new webpack.HotModuleReplacementPlugin());

        config.entry.main.app = [
            `webpack-dev-server/client/?${url}`,
            'webpack/hot/dev-server',
            config.entry.main.app
        ];

        break;
}

plugins.push(new HtmlWebpackPlugin({
    template: './src/index.html'
}));

config.plugins = plugins;

module.exports = validate(config);