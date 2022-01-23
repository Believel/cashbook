import { Service } from "egg";
// import * as moment from "moment";

interface Condition {
  pageSize: number;
  pageNo: number;
  user_id: string;
  date: any;
  type_id: string;
}

export default class Bill extends Service {
  async add(billInfo: any) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Bill.create(billInfo);
      return result;
    } catch (error) {
      return null
    }
  }
  // 分页
  async find(condition: Condition ) {
    const { pageSize, pageNo, date, ...rest} = condition;
    const { ctx } = this;
    const { start, end } = date;

    // 日期模糊查询： 2022-01 这样没实现通
    // $regex  模糊查询 {}
    // $or  多条件查询 []
    // date: {'$regex': reg }
    
    try {
      const result = await ctx.model.Bill.find({ ...rest, date: { $gte: start, $lt: end }}).skip(pageSize * (pageNo - 1)).limit(pageSize);
      return result;
    } catch (error) {
      return null;
    }
  }
  // 总数
  async count(condition: any) {
    const { date, ...rest} = condition
    const { ctx } = this;
    const { start, end } = date;
    try {
      const result = await ctx.model.Bill.countDocuments({ ...rest, date: { $gte: start, $lt: end }});
      return result
    } catch (error) {
      return null;
    }
  }
}