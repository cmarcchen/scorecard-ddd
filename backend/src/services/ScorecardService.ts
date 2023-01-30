import ScorecardRepo from '@src/repos/ScorecardRepo';
import { IScorecard } from '@src/models/Scorecard';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const SCORECARD_NOT_FOUND_ERR = 'Scorecard not found';

// **** Functions **** //

/**
 * Get all scorecards.
 */
function getAll(): Promise<IScorecard[]> {
	return ScorecardRepo.getAll();
}

/**
 * Add one scorecard.
 */
function addOne(scorecard: IScorecard): Promise<void> {
	return ScorecardRepo.add(scorecard);
}

/**
 * Update one scorecard.
 */
async function updateOne(scorecard: IScorecard): Promise<void> {
	const persists = await ScorecardRepo.persists(scorecard.id);
	if (!persists) {
		throw new RouteError(HttpStatusCodes.NOT_FOUND, SCORECARD_NOT_FOUND_ERR);
	}
	// Return scorecard
	return ScorecardRepo.update(scorecard);
}

/**
 * Delete a scorecard by their id.
 */
async function _delete(id: number): Promise<void> {
	const persists = await ScorecardRepo.persists(id);
	if (!persists) {
		throw new RouteError(HttpStatusCodes.NOT_FOUND, SCORECARD_NOT_FOUND_ERR);
	}
	// Delete scorecard
	return ScorecardRepo.delete(id);
}

// **** Export default **** //

export default {
	getAll,
	addOne,
	updateOne,
	delete: _delete,
} as const;
