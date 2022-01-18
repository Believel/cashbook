import { Service } from 'egg';

interface UserInfo {
  username: string;
  password: string;
  signature?: string;
  avatar?: string;
  ctime?: Date;
}

/**
 * User Service
 */
export default class User extends Service {
  /**
   * 通过用户名获取一条用户信息
   * @param username string
   * @returns 
   */
  public async getUserByname(username: string) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.findOne({ username });
      return result
    } catch (error) {
      return null;
    }
  }
  /**
   * 创建一条用户信息
   * @param userInfo 
   * @returns 
   */
  async createUser(userInfo: UserInfo) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.create(userInfo);
      return result;
    } catch (error) {
      return null;
    }
  }
  /**
   * 根据用户名修改个性签名
   * @param signature 
   * @returns 
   */
  async updateUser(signature: string, username: string, avatar: string) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.updateOne({ username }, {signature, avatar});
      return result
    } catch (error) {
      console.log("error", error)
      return null;
    }
  }
}
