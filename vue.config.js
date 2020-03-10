module.exports = {
    devServer: {
        port: 8082
    },
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
         'AMap': 'AMap' // 高德地图配置
        }
       }

}