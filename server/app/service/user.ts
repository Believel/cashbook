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
}
