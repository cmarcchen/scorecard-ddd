import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import ScorecardService from '@src/services/ScorecardService';
import { IScorecard } from '@src/models/Scorecard';
import { IReq, IRes } from './types/express/misc';

// **** Functions **** //

/**
 * Get all scorecards.
 */
async function getAll(_: IReq, res: IRes) {
	const scorecards = await ScorecardService.getAll();
	return res.status(HttpStatusCodes.OK).json({ scorecards });
}

/**
 * Add one scorecard.
 */
async function add(req: IReq<{ scorecard: IScorecard }>, res: IRes) {
	const { scorecard } = req.body;
	await ScorecardService.addOne(scorecard);
	return res
		.status(HttpStatusCodes.CREATED)
		.json({ message: 'Scorecard created' });
}

/**
 * Update one scorecard.
 */
async function update(req: IReq<{ scorecard: IScorecard }>, res: IRes) {
	const { scorecard } = req.body;
	await ScorecardService.updateOne(scorecard);
	return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one scorecard.
 */
async function delete_(req: IReq, res: IRes) {
	const id = +req.params.id;
	await ScorecardService.delete(id);
	return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
	getAll,
	add,
	update,
	delete: delete_,
} as const;
