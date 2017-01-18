var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        'main': './src/index.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.(scss|sass)$/,
            loaders: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'sass-loader'
            ]
        }, {
            test: /\.css$/,
            loaders: ['css', 'postcss']
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
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['src', 'node_modules']
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
};