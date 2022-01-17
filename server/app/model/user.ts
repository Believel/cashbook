export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const UserSchema = new Schema({
    userName: { type: String}
  });
  return mongoose.model('User', UserSchema);
}