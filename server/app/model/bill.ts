export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BillSchema = new Schema({
    // 账单类型
    pay_type: { type: Number },
    // 账单价格
    amount: { type: String },
    // 账单日期
    date: { type: Date },
    // 标签 id
    type_id: { type: Schema.Types.ObjectId, ref: "Type"},
    // 标签 名称
    type_name: { type: String },
    // 账单备注
    remark: { type: String },
    // 用户 id
    user_id: { type: Schema.Types.ObjectId, ref: "User"}
  })

  return mongoose.model('Bill', BillSchema);
}