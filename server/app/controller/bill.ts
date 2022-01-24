import { Controller } from 'egg';
import * as moment from "moment";

export default class BillController extends Controller {
  public async addBill() {
    const { ctx, app } = this;
    const { service } = ctx;
    const { amount, date, type_id, type_name, remark = '', pay_type } = ctx.request.body;
    if (!amount || !type_id || !date || !type_name || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
      return;
    }
    try {
       // 通过 token 解析，拿到 user
      const token = ctx.request.header.authorization as string;
      const decode = await app.jwt.verify(token, app.config.jwt.secret) as any;
      const result = await service.bill.add({
        pay_type,
        amount,
        date,
        type_id,
        type_name,
        remark,
        user_id: decode.id
      })
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: result
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
  async list() {
    const { ctx, app } = this;
    // method GET
    const { date, pageNo = 1, pageSize = 5, type_id = 'all' } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization as string;
      const decode = await app.jwt.verify(token, app.config.jwt.secret) as any;
      let params: any = {};
      if (type_id !== 'all') {
        params.type_id = type_id;
      }
      // 根据传入的 年月 找到要查询的范围，例如：输入：2020-01，那就查询范围：2020-01-01 ~ 2020-01-31
      if (date) {
        const start = moment(date).startOf('month').format('YYYY-MM-DD');
        const end = moment(date).endOf('month').format('YYYY-MM-DD');
        params.date = {
          start,
          end
        }
      }
      const list = await ctx.service.bill.find({
        pageNo: Number(pageNo), 
        pageSize: Number(pageSize),
        user_id: decode.id,
        ...params
      }) as any[];
      const count = await ctx.service.bill.count({
        user_id: decode.id,
        ...params
      }) as any;
  
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list: list,
          pageSize,
          pageNo,
          totalPage:  Math.ceil(count / Number(pageSize))
        }
      }

    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }

  }
  // 账单详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      ctx.body = {
        code: 500,
        msg: '订单id不能为空',
        data: null
      }
      return;
    }
    try {
      const result = await ctx.service.bill.findOne(id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: result
      }
      
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
  // 编辑账单
  async update() {
    const { ctx } = this;
    const { _id, amount, type_id, type_name, date, pay_type, remark = '', user_id } = ctx.request.body;
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }
    try {
      const result = await ctx.service.bill.update({
        _id, // 账单 id
        amount, // 金额
        type_id, // 消费类型 id
        type_name, // 消费类型名称
        date, // 日期
        pay_type, // 消费类型
        remark, // 备注
        user_id // 用户 id
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: result
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }
    try {
      const result = await ctx.service.bill.delete(id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: result
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
}
