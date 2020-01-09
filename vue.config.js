module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}
