const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//编译结果测量
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
//与uglifyjs-webpack-plugin 的区别是支持es6
const TerserPlugin = require("terser-webpack-plugin");

const smp = new SpeedMeasurePlugin();

//构建时候会有漂亮的工具条
const WebpackBar = require("webpackbar");
const resolve = (dir) => path.join(__dirname, "./", dir);
console.log('构建目录',resolve("src"));
const config = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isProduction = webpackEnv === "production";
  return {
    mode: isEnvDevelopment ? "development" : "production",
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
      libraryTarget: "umd",
      //请注意这个字段，使用webpack-dev-server的时候，访问资源的时候需要加上这个值
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".html"],
      modules: [
        // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
        resolve("src"),
        resolve("node_modules"),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.ttf$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new WebpackBar(),
      new webpack.HotModuleReplacementPlugin()
    ],

    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
        minSize: 30000, // 模块超过30k自动被抽离成公共模块
        minChunks: 1, // 模块被引用>=1次，便分割
        maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
        maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
        name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
        automaticNameDelimiter: "~", // 命名分隔符
        cacheGroups: {
          // 缓存组，会继承和覆盖splitChunks的配置
          default: {
            // 模块缓存规则，设置为false，默认缓存组将禁用
            minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
            priority: -20, // 优先级
            reuseExistingChunk: true, // 默认使用已有的模块
          },
          amis: {
            name: "amis", // 将 amis 拆包
            test: /[\\/]node_modules[\\/]amis[\\/]/,
          },
          antd: {
            name: "antd", // 将 antd 拆包
            test: /[\\/]node_modules[\\/]antd[\\/]/,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
            priority: -10,
          },
        },
      },
    },
    // devtool: "inline-source-map", sourceMap先关了，build的时候再打开
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      publicPath: path.join(__dirname, "dist"),
      //historyApiFallback 解决刷新时候react-router 404问题
      historyApiFallback:{
        rewrites: [{
          from: /.*/g,
          to: '/public/index.html'
        }]
      },
      compress: true,
      port: 9000,
      hot: true,
      proxy: {
        "/": "http://localhost:3000",
      },
    },
  };
};

module.exports = smp.wrap(config);
