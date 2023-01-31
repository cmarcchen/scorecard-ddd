import { TAll } from 'jet-validator';
import { ITeam } from './Team';
import { ICriterion } from './Criterion';

// **** Types **** //

export interface IScorecard {
  id: number;
  name: string;
  team: ITeam;
  criteria: ICriterion[];
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(name: string, team: ITeam, criteria?: ICriterion[]): IScorecard {
  return {
    id: -1,
    name,
    team,
    criteria: criteria || [],
  };
}
function assignCriteria(
  scorecard: IScorecard,
  criterion: ICriterion,
): IScorecard {
  return { ...scorecard, criteria: [...scorecard.criteria, criterion] };
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
    criteria: scorecard.criteria,
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
  assignCriteria,
  duplicateScorecard,
  instanceOf,
} as const;
