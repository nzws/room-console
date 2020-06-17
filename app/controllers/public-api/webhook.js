import db from '../../db';
import { errorController } from '../common';
import send from '../../utils/send';

const apiWebHook = async ctx => {
  const { workflows } = ctx.request.body;
  const { token } = ctx.params;

  const result = await db.tables.Hook.findOne({
    where: {
      token
    }
  });
  if (!result) {
    return errorController(ctx, 404, 'hookが存在しません');
  }

  for (const workflow of workflows) {
    try {
      await send(workflow.id, workflow.type, {
        value: workflow.value || undefined
      });
    } catch (e) {
      return errorController(ctx, 503, e.message);
    }
  }

  ctx.body = { status: 'success' };
};

export default apiWebHook;
