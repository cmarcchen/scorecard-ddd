import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';

/**
 * Get Hello World!
 */
function get(_: IReq, res: IRes) {
  res.json({message: 'Hello World'});
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  get,

} as const;
