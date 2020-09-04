const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // 自动清除沉余js

module.exports = {
    entry: {
        // index: './src/index.ts',
        poster: './src/Poster.ts'
    }, //入口文件
    output: {
        filename: 'js/[name].min.js', // 默认为main.js  [hash]是为了避免js缓存
        path: path.resolve(__dirname, './dist'), // path为绝对路径，用node path模块转化
        library: "Poster",
        libraryExport: "default",
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    // mode:  "development", // 开发模式, 生产模式 'production' 会压缩代码 不配置会自动选择
    module: { // 加载 css less
        rules: [{
                test: /\.css$/, // js 中 require css
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                // 注意顺序
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [ // es6 内置函数转换
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|m4a)$/, // 加载js img 对象、css 中的图片、音频等资源
                use: [{
                    loader: 'url-loader',
                    options: {
                        //图片大小小于等于limit值，则会以base64形式加载，不会发请求，大于这个值则用file-loader加载
                        limit: 200 * 1024
                    }
                }]
            },
            {
                test: /\.html$/, // 加载 img 标签中的图片
                use: [{
                    loader: 'html-withimg-loader',
                    options: {}
                }]
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        // 指定特定的ts编译配置，为了区分脚本的ts配置
                        configFile: path.resolve(__dirname, './tsconfig.json'),
                    },
                }, ],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [ // 存放插件
        new CleanWebpackPlugin(),
    ],
}