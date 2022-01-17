
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
2. connect database
```js
// {app_root}/config/config.deault.ts
  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/daily_const",
      options: {},
      plugins: []
    }
  };
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

