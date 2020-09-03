const path = require('path')
const webpack = require('webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // 自动清除沉余js
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 插件
const copyWebpackPlugin = require('copy-webpack-plugin'); // 打包静态资源

module.exports = {
    entry: {
        index: './src/index.ts',
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
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板
            filename: 'index.html', // 默认也是index.html
            minify: {
                removeEmptyAttributes: false, //是否删除空属性，默认false
                removeAttributeQuotes: false, // 删除标签属性的双引号
                collapseInlineTagWhitespace: false, // 删除多余空格
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
                minifyCSS: false // 压缩内联css
            },
            hash: true, // 增加hash，避免缓存
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/static', //打包的静态资源目录地址
            to: './static' //打包到dist下面
        }]),
        new CleanWebpackPlugin(),
    ],
    // 控制台信息
    devServer: { // 开发服务器配置
        host: '0.0.0.0',
        port: 3000, // 端口号
        progress: true, // 进度条
        https: true,
        // contentBase: './static', // 服务默认指向文件夹
        inline: true, // 设置为true，当源文件改变的时候会自动刷新
        historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot: false, // 允许热加载  和inline不能同时 是true
        open: true, // 自动打开浏览器  
        disableHostCheck: true, //外网映射
        stats: 'errors-only',
        onListening(server) {
            const port = server.listeningApp.address().port;
            console.log('Listening on port:', JSON.stringify(port));
        }
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all", //async异步代码分割 initial同步代码分割 all同步异步分割都开启
    //         minSize: 30000, //字节 引入的文件大于30kb才进行分割
    //         //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
    //         minChunks: 1, //模块至少使用次数
    //         maxAsyncRequests: 5, //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
    //         maxInitialRequests: 3, //首页加载的时候引入的文件最多3个
    //         automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
    //         name: true, //缓存组里面的filename生效，覆盖默认命名
    //         cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
    //             vendors: { //自定义打包模块
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
    //                 filename: 'vendors.js',
    //             },
    //             default: { //默认打包模块
    //                 priority: -20,
    //                 reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
    //                 filename: 'common.js'
    //             }
    //         }
    //     }
    // }
}