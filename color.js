/*
 * @Description:
 * @Author: huangshiwen
 * @Date: 2022-03-02 14:19:02
 * @LastEditTime: 2022-03-23 18:35:44
 */
const { generateTheme } = require('antd-theme-generator');
const path = require('path');

const fs = require('fs');
// 删除上次文件
fs.access(path.join(__dirname, './public/color.less'), (err) => {
  if (!err) {
    fs.unlinkSync(path.join(__dirname, './public/color.less'));
  }
});

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src'), // all files with .less extension will be processed
  varFile: path.join(__dirname, './src/assets/theme/var.less'), // default path is Ant Design default.less file
  themeVariables: [
    '@primary-color',
    '@link-color',
    '@success-color',
    '@warning-color',
    '@error-color',
    '@layout-text',
    '@layout-background',
    '@heading-color',
    '@text-color',
    '@text-color-secondary',
    '@disabled-color',
    '@border-color-base',
  ],
  outputFilePath: path.join(__dirname, './public/color.less'),
};

generateTheme(options)
  .then((less) => {
    console.log('Theme generated successfully');
  })
  .catch((error) => {
    console.log('Error', error);
  });
