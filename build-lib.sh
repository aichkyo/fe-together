#!/bin/bash

echo "开始执行build-lib.sh脚本"


# 定义包名和版本号
PACKAGE_NAME="hrui"
# PACKAGE_VERSION=$(npm run --silent version)
PACKAGE_VERSION="1.0.1"


PACKAGE_NAME_VERSION=$PACKAGE_NAME@$PACKAGE_VERSION

# 清理构建目录
# rm -rf dist

echo "开始构建包，包名：$PACKAGE_NAME，版本号：$PACKAGE_VERSION"

# 构建库
# --dest 指定输出目录 (默认值：dist)
yarn vue-cli-service build --target lib --name "$PACKAGE_NAME_VERSION"  ./packages/index.js


# 捕获所有错误
trap 'echo "An error occurred. Please see the error message above." && exit 1' ERR


# 在这里，你可以添加其他构建步骤，例如上传到npm等


# 不关闭终端
echo '按任意键继续'
read -n 1