export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const UserSchema = new Schema({
    // 用户姓名
    username: { type: String },
    // 用户密码
    password: { type: String },
    // 个性签名
    signature: { type: String },
    // 用户头像
    avatar: { type: String },
    // 用户创建时间
    ctime: { type: Date }
  });
  return mongoose.model('User', UserSchema);
}