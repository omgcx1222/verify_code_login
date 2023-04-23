## 介绍

一个基于`node koa mysql typescript` 实现的 **qq邮箱验证码注册**、**邮箱密码登录**、**邮箱验证码修改密码** 的api 项目



## 前置要求

### Node

项目搭建时我的`node`版本是  `v18.12.1` ，`pnpm`版本是 `8.2.0` ，`node`版本是`8.19.2`，使用 [nvm](https://github.com/nvm-sh/nvm) 可管理本地多个 `node` 版本

```shell
#查看版本
node -v
```

### PNPM
如果你没有安装过 `pnpm`
```shell
#全局安装pnpm
npm install pnpm -g
```

### Mysql

mysql新建一个数据库（注意是新建数据库不是新建连接，新建的数据库名称和下面`.env`文件的数据库名称保持一致）

并导入根目录下的 `verify_code_login.sql`  文件

### QQ邮箱

登录pc端[qq邮箱](https://wx.mail.qq.com/)

找到 `设置 - 账户 - 找到第三方服务IMAP/SMTP服务 - 选择开启IMAP/SMTP服务 并生成授权码`

## 安装依赖

在项目目录下运行以下命令，如果安装依赖出错，注意`node pnpm`版本，建议和我的版本保持一致
```shell
pnpm install
```

如果出现  ` ETIMEDOUT  request to https://cdn.npmmirror.com/packages/mysql2/3.2.3/mysql2-3.2.3.tgz failed, reason: connect ETIMEDOUT 183.60.205.239:443`

可能是使用了淘宝镜像的原因，建议修改回官方镜像 `npm config set registry https://registry.npmjs.org`



## 环境变量

在 `src` 同级目录下创建 `.env` 文件，注意不要漏了这个小点 `.`

`.env` 文件的内容为：

    # 接口启动端口
    APP_PORT = 80
    
    # 数据库地址，如果部署到服务器则改成 http://123.xxx.xxx.xxx
    MYSQL_HOST = localhost
    
    # 数据库端口
    MYSQL_PORT = 3306
    
    # 数据库名称（自己新建一个数据库）
    MYSQL_DATABASE = verify_code_login
    
    # 数据库用户名（一般是root）
    MYSQL_USER = root
    
    # 数据库密码
    MYSQL_PASSWORD = xxx
    
    # 数据库连接池（设置10即可）
    MYSQL_CONNECTIONLIMIT = 10
    
    # 开启IMAP/SMTP服务的邮箱
    EMAIL = xxx@qq.com
    
    # IMAP/SMTP服务生成的授权码
    EMAIL_PASSWORD = xxx
    
    # 验证码有效期（单位 分钟）
    EMAIL_CODE_VALIDITY = 5



## 启动

在根目录下运行 `pnpm start`

提示：

`服务器启动成功，端口为xxx`

`连接数据库成功`

表示启动成功



## api接口文档

#### 1. 获取验证码

POST /user/get-code

> Body 请求参数

```json
{
  "email": "xxx@qq.com"
}
```

##### 请求参数

| 名称  | 类型   | 必选 | 说明             |
| ----- | ------ | ---- | ---------------- |
| email | string | 是   | 接收验证码的邮箱 |



#### 2. 注册

POST /user/sign-up

> Body 请求参数

```json
{
    "code": "956035",
    "password": "a123456", 
    "email": "xxx@qq.com"
}
```

##### 请求参数

| 名称     | 类型   | 必选 | 说明                                                         |
| -------- | ------ | ---- | ------------------------------------------------------------ |
| code     | string | 是   | 根据 /user/get-code 接口获取到验证码，获取验证码的邮箱要和注册邮箱保持一致 |
| password | string | 是   | 6-18任意两种 数字、英文、特殊符号组合                        |
| email    | string | 是   | 接收验证码的邮箱                                             |



#### 3. 密码登录

POST /user/sign-in-pwd

> Body 请求参数

```json
{
    "password": "a123456", 
    "email": "xxx@qq.com"
}
```

##### 请求参数

| 名称     | 类型   | 必选 | 说明                                  |
| -------- | ------ | ---- | ------------------------------------- |
| password | string | 是   | 4-16任意两种 数字、英文、特殊符号组合 |
| email    | string | 是   | 接收验证码的邮箱                      |



#### 4. 修改密码

POST /user/change-pwd

> Body 请求参数

```json
{
    "code": "956035",
    "password": "a123456", 
    "email": "xxx@qq.com"
}
```

##### 请求参数

| 名称     | 类型   | 必选 | 说明                                                         |
| -------- | ------ | ---- | ------------------------------------------------------------ |
| code     | string | 是   | 根据 /user/get-code 接口获取到验证码，获取验证码的邮箱要和注册邮箱保持一致 |
| password | string | 是   | 4-16任意两种 数字、英文、特殊符号组合                        |
| email    | string | 是   | 接收验证码的邮箱                                             |
