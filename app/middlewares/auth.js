import { errorController } from '../controllers/common';
import { authToken } from '../utils/token';

const auth = async (ctx, next) => {
  const token = ctx.request.headers.authorization;
  if (!token) {
    return errorController(ctx, 403, 'このページはログインが必要です。');
  }

  const t = await authToken(token);
  if (!t) {
    return errorController(ctx, 400, 'トークンが無効です [require_renew_auth]');
  }
  ctx.state.auth = t;

  return next();
};

export default auth;
