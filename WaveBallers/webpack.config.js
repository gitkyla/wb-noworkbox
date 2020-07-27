const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
    entry: {
        index : "./src/index.js",
        info : "./src/js/info.js",
        player : "./src/js/player.js",
        nav : "./src/js/nav.js"
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test : /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test : /\.(png|jpg)$/,
                loader:'file-loader',
                include: path.join(__dirname , 'src')
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: 'index.html',
            excludeChunks : ['info','player']
        }),
        new HtmlWebpackPlugin({
            template: "./src/info.html",
            filename: 'info.html',
            excludeChunks : ['nav','player']
        }),
        new HtmlWebpackPlugin({
            template: "./src/player.html",
            filename: 'player.html',
            excludeChunks: ['nav','info']
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
            excludes: [
                '**/.*',
                '**/*.map'
            ],
            filename: 'sw.js'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './pages'),
                    to: path.resolve(__dirname, 'dist/pages')
                },
                {
                    from: path.resolve(__dirname, './src/logo.png'),
                    to: path.resolve(__dirname, 'dist/')
                },
                {
                    from: path.resolve(__dirname, './src/favicon'),
                    to: path.resolve(__dirname, 'dist/favicon')
                },
                {
                    from: path.resolve(__dirname, './src/img'),
                    to: path.resolve(__dirname, 'dist/img')
                },
                {
                    from: path.resolve(__dirname, './src/nav.html'),
                    to: path.resolve(__dirname, 'dist/')
                },
                {
                    from: path.resolve(__dirname, './src/footer.html'),
                    to: path.resolve(__dirname, 'dist/')
                }
            ]
          }),
          new WebpackPwaManifest({
            filename: 'manifest.json',
            name: 'WaveBallers',
            short_name: 'WaveBallers',
            display: "standalone",
            ios: true,
            inject: true,
            fingerprints: false,
            description: 'Informasi Seputar Sepak bola',
            background_color: '#e53935',
            crossorigin: 'use-credentials',
            theme_color: '#e53935',
            gcm_sender_id: '475729610339',
            icons: [
              {
                src: path.resolve('src/icon.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('icons'),
                
              }
            ]
          })
        ]
}