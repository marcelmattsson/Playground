const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const extractLess = new ExtractTextPlugin({ filename: 'main.css' });

const paths = {
    components: path.resolve(__dirname, 'src/components'),
    dist: path.resolve(__dirname, 'src/dist'),
};

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/dist'),
    },
    context: __dirname,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*'],
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [['es2015', { modules: false }], 'react'],
            },
        },
        {
            test: /\.less$/,
            include: paths.components,
            use: extractLess.extract({
                use: [{
                    loader: 'css-loader',
                    options: { importLoaders: 1, sourceMap: true },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer({
                                browsers: [
                                    'last 2 versions',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                            }),
                        ],
                        sourceMap: true,
                    },
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                    },
                }],
                // use style-loader in development
                fallback: 'style-loader',
                publicPath: '/',
            }),
        }],
    },
    plugins: [
        new LiveReloadPlugin({ appendScriptTag: true }),
        extractLess,
    ],
};
