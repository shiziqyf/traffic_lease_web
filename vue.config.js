module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
         'AMap': 'AMap' // 高德地图配置
        }
       }



}