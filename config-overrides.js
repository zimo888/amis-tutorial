const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy,
    addWebpackPlugin,
    disableEsLint,
    overrideDevServer,
    addWebpackAlias,
    babelInclude
} = require('customize-cra');
const path = require('path');
const fs = require('fs');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 打包配置
const addCustomize = () => (config,env) => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
    }
    return config;
}


// 跨域配置
const devServerConfig = () => config => {
    if (process.env.NODE_ENV === 'production') {
        return productionConfig(config);
    }
    return {
        ...config,
        compress: true,
        proxy: [
            {
                context: ['/api/'],//这里配置需要转发的前缀
                target: 'http://xxx.com',//这里配置目标路径
                changeOrigin: true,
                secure: false,
                onProxyRes: function (proxyRes) {
                    //cookie 的设置，把Domain设置成自己的。
                    const cookies = proxyRes.headers['set-cookie']
                    const cookieRegex = /Domain=\.xxxx.com/i
                    if (cookies) {
                        const newCookie = cookies.map(function (cookie) {
                            if (cookieRegex.test(cookie)) {
                                return cookie.replace(cookieRegex, 'Domain=localhost')
                            }
                            return cookie
                        })
                        delete proxyRes.headers['set-cookie']
                        proxyRes.headers['set-cookie'] = newCookie
                    }
                }
            }
        ]

    }
}

module.exports = {
    webpack: override(
        addWebpackPlugin(new ProgressBarPlugin()),
        addDecoratorsLegacy(),
        disableEsLint(),
        babelInclude([
            fs.realpathSync('src')
        ]),
        fixBabelImports('import', [{
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }]),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#4E80F5' }
            }
        }),
        addCustomize(),
        // devServerConfig(),//需要跨域的时候打开此项
        addWebpackAlias({
            "@": path.resolve(__dirname, "src"),
            'sortablejs$': 'sortablejs/Sortable.js' //修正Amis 拖拽问题
        })
    )
}


