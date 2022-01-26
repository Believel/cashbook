import { Service } from "egg";

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
    const { start, end } = date || {};

    // 日期模糊查询： 2022-01 这样没实现通
    // $regex  模糊查询 {}
    // $or  多条件查询 []
    // date: {'$regex': reg }
    
    try {
      let params: any = {...rest};
      if (date) {
        params.date = { $gte: start, $lt: end }
      }
      const [result, count] = await Promise.all([
        ctx.model.Bill.find(params).skip(pageSize * (pageNo - 1)).limit(pageSize),
        ctx.model.Bill.countDocuments(params)
      ]);
      return {
        result,
        count
      };
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
  // 详情
  async findOne(id: string) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Bill.findOne({ _id: id})
      return result;
    } catch (error) {
      return null;
    }
  }
  // 根据订单id 修改订单信息
  async update(condition) {
    const { ctx } = this;
    const { _id, user_id,  ...rest} = condition
    try {
      const result = await ctx.model.Bill.updateOne({ _id, user_id }, rest);
      return result;
    } catch (error) {
      return null;
    }
  }
  // 删除
  async delete(_id: string) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Bill.findOneAndRemove({ _id });
      return result;
    } catch (error) {
      return null;
    }

  }
}