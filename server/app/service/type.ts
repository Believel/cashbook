import { Service } from "egg";

export default class Type extends Service {
  async create(body: any) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Type.create(body);
      return result
    } catch (error) {
      return null;
    }
  }
  async find() {
    const { ctx } = this;
    try {
      const result = await ctx.model.Type.find({ user_id: '0'});
      return result
    } catch (error) {
      return null;
    }
  }
}