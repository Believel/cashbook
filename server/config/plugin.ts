import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mongoose: {
    enable: true,
    package: "egg-mongoose"
  },
  // 开启 jwt 鉴权
  jwt: {
    enable: true,
    package: "egg-jwt"
  }
};

export default plugin;
