import { Context } from "egg";

export default function jwt(secret: string) {

  return async (ctx: Context, next: () => Promise<any>) => {
    // 通过 token 解析，拿到 user
    const token = ctx.request.header.authorization as string;
    if (token) {
      try {
        ctx.app.jwt.verify(token, secret);
        await next();
        
      } catch (error) {
        ctx.status = 200,
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401
        }
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  }
}