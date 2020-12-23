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
        addWebpackAlias({
            "@": path.resolve(__dirname, "src"),
            'sortablejs$': 'sortablejs/Sortable.js' //修正Amis 拖拽问题
        })
    )
}


