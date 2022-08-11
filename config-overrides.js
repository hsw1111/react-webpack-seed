/*
 * @Description:webpack配置
 * @Author: huangshiwen
 * @Date: 2022-02-14 17:40:56
 * @LastEditTime: 2022-05-28 00:07:12
 */
const {
  override,
  addWebpackAlias,
  fixBabelImports,
  useBabelRc,
  addLessLoader,
  overrideDevServer,
} = require('customize-cra');
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
require('dotenv').config({ path: process.env.REACT_APP_ENV });

const TerserPlugin = require('terser-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const themeConfig = lessToJs(
  fs.readFileSync(path.join(__dirname, './src/assets/theme/var.less'), 'utf8'),
  {
    stripPrefix: true,
    resolveVariables: false,
  },
);
// 打包体积优化
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const addOptimization = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
    };
    config.output.publicPath = process.env.REACT_APP_PATH + '/';
    // 关闭sourceMap
    config.devtool = false;
  }
  config.plugins.push(
    new HardSourceWebpackPlugin()  //这插件为模块提供中间缓存步骤--解决打包慢的问题
  )
  return config;
};
const devServerConfig = () => (config) => {
  return {
    ...config,
    // proxy: {
    //   '/v1/xsmes': {
    //     target: 'https://arktest.boe.com.cn',
    //     changeOrigin: true,
    //   },
    // },
  };
};
//  添加monacoEditor插件
const addMonacoEditor = () => (config) => {
  config.plugins.push(new MonacoWebpackPlugin());
  return config;
};
module.exports = {
  webpack: override(
    addOptimization(),
    useBabelRc(),
    addMonacoEditor(),
    // 配置路径别名
    addWebpackAlias({
      '@': path.resolve('src'),
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        localIdentName: '[local]--[hash:base64:5]',
        modifyVars: themeConfig,
      },
    }),
  ),
  // 本地启动配置，可以设置代理
  devServer: overrideDevServer(devServerConfig()),
};
