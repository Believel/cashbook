import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  // 传入加密的字符串
  const jwtErr = middleware.jwt(app.config.jwt.secret);
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/verify', jwtErr, controller.user.verify)
};
