export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const BillSchema = new Schema({
    // 账单类型：1 支出，2 收入
    type: { type: Number },
    // 标签 code
    code: { type: String }, 
    // 标签名称
    name: { type: String },
    // 标签的用户归属
    user_id: { type: Schema.Types.ObjectId, ref: "User"}
  })

  return mongoose.model('Type', BillSchema);
}