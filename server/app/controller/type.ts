import { Controller } from 'egg';

export default class TypeController extends Controller {
  async create() {
    const { ctx } = this;
    // 标签ID、标签名称、账单类型、用户类型：传0表示都可以查看
    const { id, name, type, user_id = '0' } = ctx.request.body;
    try {
      // const token = ctx.request.header.authorization as string;
      // const decode = await app.jwt.verify(token, app.config.jwt.secret) as any
      // const user_id = decode.id
      const result = await ctx.service.type.create({
        id,
        name,
        type,
        user_id
      })
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: result
      }

    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '服务器错误',
        data: null
      }
    }
  }
}