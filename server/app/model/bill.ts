import * as moment from "moment";
export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BillSchema = new Schema({
    // 账单类型
    pay_type: { type: Number },
    // 账单价格
    amount: { type: String },
    // 账单日期
    date: { 
      type: Date,
      default: Date.now,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
    // 标签 id  ref表示引用Type模型
    type_id: { type: Schema.Types.ObjectId, ref: "Type"},
    // 标签 名称
    type_name: { type: String },
    // 账单备注
    remark: { type: String },
    // 用户 id
    user_id: { type: Schema.Types.ObjectId, ref: "User"}
  })
  BillSchema.set('toJSON', { getters: true });

  return mongoose.model('Bill', BillSchema);
}