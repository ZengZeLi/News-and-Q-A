# News-and-Q-A
A WeChat MiniProgram for read news and publish a question and get answer
## 项目介绍
    本项目是一个集新闻阅读与问答为一体的小程序
## 所用技术及必要环境
### 所用技术
    前端使用了 vant-weapp 组件库，使用腾讯的微信Web开发者工具开发。
    后台使用了 node.js 的 express 框架开发
    数据库使用 MongoDB
### 必要环境
    node+mongoDB,其中数据库名称为 miniProgram，其中可以在 myAppEnd 中改数据库名称
## 运行步骤（基于必要环境搭建完成）
### 启动服务器
    进入 myAppEnd 目录命令行下
>node index.js
### 启动数据库
    进入 MongoDB 的 bin 目录的命令行
>mongod --dbpath F:\database\newsMiniProgram

    其中 F:\database\newsMiniProgram 是数据库的根目录
    再次进入 MongoDB 的 bin 目录的命令行
>mongo

    数据库启动
### 打开微信开发者工具
    在模拟器上可以看到小程序已经可以使用。由于采用了外部接口，所以前端文件夹的 index 下的 index.js 接口 Key 使用次数有限，只有一百次。
    
