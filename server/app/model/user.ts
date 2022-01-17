export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const UserSchema = new Schema({
    // 用户姓名
    username: { type: String, require: true },
    // 用户密码
    password: { type: String, require: true },
    // 个性签名
    signature: { type: String },
    // 用户头像
    avatar: { type: String },
    // 用户创建时间
    ctime: { type: Date, default: new Date() }
  });
  return mongoose.model('User', UserSchema);
}