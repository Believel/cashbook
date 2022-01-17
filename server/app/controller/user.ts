import { Controller } from 'egg';

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

export default class HomeController extends Controller {
  // 注册
  public async register() {
    const { ctx } = this;
    const { service } = ctx;
    const { username, password } = ctx.request.body;
    const userInfo = await service.user.getUserByname(username);
    const result = await service.user.createUser({
      username,
      password,
      avatar: defaultAvatar,

    });

    // 判空
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: "账号密码不能为空",
        data: null,
      }
      return;
      
    }
    // 判断是否已经存在
    if (userInfo && userInfo._id) {
      ctx.body = {
        code: 500,
        msg: "账户名已经被注册，请重新输入",
        data: null
      }
      return;
    }
    if (result) {
      console.log("result", result);
      ctx.body = {
        code: 200,
        msg: "注册成功",
        data: result
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }
}
