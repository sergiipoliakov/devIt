const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    publicPath = '/account/'.replace('//', '/');
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    name: 'js',
    entry: {
        app: './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'build.[name].js',
        chunkFilename: 'build.[id].chunk.js',
        publicPath
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/
            },
            {
                use: 'eslint-loader',
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:10]'
                            },
                            sourceMap: false
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }, {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    MiniCssExtractPlugin.loader, 
					'css-loader', 
					{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }, {
                test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: [
            '.js',
            '.ts',
            '.tsx',
            '.sass',
            '.css'
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 1000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false
        }
    },
    performance: {
        hints: false
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                minify: {
                    collapseWhitespace: true,
                    preserveLineBreaks: true
                },
                ...(Number(process.env.SHOW_BRAND) ? { favicon: './src/custom/images/favicon.png' } : {})
            }
        ),
        new webpack.DefinePlugin(
            {
                'process.env': JSON.stringify(process.env)
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin()
    ]
  }
};

module.exports = config;
