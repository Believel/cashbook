
# QuickStart
## init project

```js
mkdir server && cd server
npm init egg --type=ts

```

## Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

## Deploy

```bash
$ npm run tsc
$ npm start
```

## Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

## Requirement

- Node.js 8.x
- Typescript 2.8+

# 连接数据库
1. install: `npm i egg-mongoose --save`
2. configuration: Change `{app_root}/config/plugin.js` to enable `egg-mongoose` plugin:
```js
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: "egg-mongoose"
  }
};

export default plugin;
```
3. connect database
```js
// {app_root}/config/config.deault.ts
  config.mongoose = {
    client: {
      // 数据库类型：mongodb
      // 本地连接地址和端口：127.0.0.1:27017
      // 连接数据库：daily_const
      url: "mongodb://127.0.0.1:27017/daily_const",
      options: {},
      plugins: []
    }
  };
```

4. CURD
```js
// 增
ctx.model.User.create()
// 删
// 改
ctx.model.User.updateOne(condition, doc)
// 查
ctx.model.User.findOne(condition)
```





# 遇到的问题
1. Post请求`invalid csrf token`问题
```js
// 一种处理方式：关闭 csrf
// {app_root}/config/config.default.ts
config.security = {
  csrf: {
    enable: false
  }
};
```

