# doly-simple-template

> 适用于开发简单web项目，构建工具使用 [doly-cli](https://github.com/doly-dev/doly-cli#readme) 。
> 
> 如果要制定自己的业务脚手架，可以基于它进行修改。



**默认集成以下模块**

- [axios](https://github.com/axios/axios) - 请求
- [react-router-dom](https://github.com/ReactTraining/react-router) - 路由
- [eslint-config-doly-react](https://github.com/doly-dev/eslint-config-doly/tree/master/packages/eslint-config-doly-react) - 代码检查
- [prettier-config-doly](https://github.com/doly-dev/prettier-config-doly) - 代码风格

`pre-commit` 会执行代码检查，可以在 `.eslintrc` 文件扩展或重写规则。参考 [ESLint Rules](http://eslint.cn/docs/rules/#stylistic-issues)、[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## 目录结构

```
├── mocker                   # mock数据
├── public
│   ├── favicon.png          # Favicon
├── src
│   ├── assets               # 静态资源，如图片、样式、字体等
│   ├── components           # 组件
│   ├── pages                # 页面
│   ├── services             # 后台接口服务
│   ├── utils                # 工具
│   ├── app.js               # 入口 JS
│   ├── router.config.js     # 路由配置
│   ├── index.html           # html页面
├── doly.config.js           # doly 配置
├── package.json
├── README.md

```

## 本地开发

> 本地环境需安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)

`git clone` 项目，进入项目文件

### 安装依赖

```shell
npm install 
```

> 如果网络状况不佳，可以使用 [cnpm](https://cnpmjs.org/) 进行加速。

### 运行

```shell
npm start
```

or 

```shell
# 不使用mock数据
npm run start:no-mock
```

> 启动完成后会自动打开浏览器访问 [http://localhost:9000](http://localhost:9000)

### 打包

```shell
npm run build
```



