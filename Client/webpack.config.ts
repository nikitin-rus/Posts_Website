import { Configuration } from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";

export default function (env: any): Configuration {
    const devMode = !env.production;

    return {
        mode: devMode ? "development" : "production",
        entry: path.resolve(__dirname, 'src', 'main.tsx'),
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                publicPath: "/"
            }),
            new MiniCssExtractPlugin()
        ],
        devServer: {
            port: 5173,
            historyApiFallback: true,
        },
        watchOptions: {
            poll: 1000,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                icon: 24
                            }
                        }
                    ],
                },
                {
                    test: /\.ttf$/,
                    type: "asset/resource"
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json']
        },
        output: {
            clean: true
        }
    }
}