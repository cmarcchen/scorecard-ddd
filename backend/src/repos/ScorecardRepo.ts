import { IScorecard } from '@src/models/Scorecard';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one scorecard.
 */
async function getOne(name: string): Promise<IScorecard | null> {
	const db = await orm.openDb();
	for (const scorecard of db.scorecards) {
		if (scorecard.name === name) {
			return scorecard;
		}
	}
	return null;
}

/**
 * See if a scorecard with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
	const db = await orm.openDb();
	for (const scorecard of db.scorecards) {
		if (scorecard.id === id) {
			return true;
		}
	}
	return false;
}

/**
 * Get all scorecards.
 */
async function getAll(): Promise<IScorecard[]> {
	const db = await orm.openDb();
	return db.scorecards;
}

/**
 * Add one scorecard.
 */
async function add(scorecard: IScorecard): Promise<void> {
	const db = await orm.openDb();
	scorecard.id = getRandomInt();
	db.scorecards.push(scorecard);
	return orm.saveDb(db);
}

/**
 * Update a scorecard.
 */
async function update(scorecard: IScorecard): Promise<void> {
	const db = await orm.openDb();
	for (let i = 0; i < db.scorecards.length; i++) {
		if (db.scorecards[i].id === scorecard.id) {
			db.scorecards[i] = scorecard;
			return orm.saveDb(db);
		}
	}
}

/**
 * Delete one scorecard.
 */
async function delete_(id: number): Promise<void> {
	const db = await orm.openDb();
	for (let i = 0; i < db.scorecards.length; i++) {
		if (db.scorecards[i].id === id) {
			db.scorecards.splice(i, 1);
			return orm.saveDb(db);
		}
	}
}

// **** Export default **** //

export default {
	getOne,
	persists,
	getAll,
	add,
	update,
	delete: delete_,
} as const;
