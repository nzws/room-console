import send from '../../utils/send';
import { errorController } from '../common';
import { logError } from '../../utils/logger';

const apiSend = async ctx => {
  const { id, type, data } = ctx.request.body;

  try {
    await send(id, type, data);
  } catch (e) {
    logError(e);
    return errorController(ctx, 400, e.message);
  }

  ctx.body = { status: 'success' };
};

export default apiSend;
