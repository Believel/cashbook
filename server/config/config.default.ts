import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642345799443_2663';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1:27017/daily_const",
      options: {}
    }
  };
  config.security = {
    csrf: {
      enable: false
    }
  };
  // 配置 jwt
  config.jwt = {
    // 加密字符串
    secret: "zjr"
  }
  // 配置 文件上传
  config.multipart = {
    mode: 'file'
  }
  // 上传文件存放目录
  config.uploadDir = 'app/public/upload';
  // 跨域配置
  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
