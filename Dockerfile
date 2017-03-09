# 获取相应语言的镜像
FROM node:latest 
# 设置该镜像的作者
MAINTAINER huchangfa<hcf1095246249@qq.com>

WORKDIR /myblog
COPY . /myblog/
# 安装nodemoudule里面的包，yarn限制了安装版本，速度更快
RUN yarn install
# 把端口对外开放
EXPOSE 3007
# 指定首个运行的文件
ENTRYPOINT node start.js
