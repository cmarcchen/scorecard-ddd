import { TAll } from 'jet-validator';
import { ITeam } from './Team';

// **** Types **** //

export interface IScorecard {
  id: number;
  name: string;
  team: ITeam;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(name: string, team: ITeam): IScorecard {
  return {
    id: -1,
    name,
    team,
  };
}

/**
 * Copy a user object.
 */
function duplicateScorecard(
  scorecard: IScorecard,
  assignTeam: ITeam,
): IScorecard {
  return {
    id: -1,
    name: `${scorecard.name} copy`,
    team: assignTeam,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return !!arg && typeof arg === 'object' && 'id' in arg && 'name' in arg;
}

// **** Export default **** //

export default {
  new: new_,
  duplicateScorecard,
  instanceOf,
} as const;
