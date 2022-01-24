import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  // 传入加密的字符串
  const jwtErr = middleware.jwt(app.config.jwt.secret);
  router.get('/', controller.home.index);
  // 用户相关路由
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/verify', jwtErr, controller.user.verify)
  router.get('/api/user/get_userinfo', jwtErr, controller.user.getUserInfo);
  router.post('/api/user/update_userinfo', jwtErr, controller.user.updateUserInfo);
  router.post('/api/upload', jwtErr, controller.upload.upload);
  // 账单相关路由
  router.post('/api/bill/add', jwtErr, controller.bill.addBill);
  router.post('/api/bill/list', jwtErr, controller.bill.list);
  router.get('/api/bill/detail/:id', jwtErr, controller.bill.detail);
  router.post('/api/bill/update', jwtErr, controller.bill.update);
  router.post('/api/bill/delete', jwtErr, controller.bill.delete);

};
