import { TAll } from 'jet-validator';
import { IScorecard } from '@src/models/Scorecard';

// **** Types **** //

export interface ITeam {
  id: number;
  name: string;
  scorecards: IScorecard[];
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(name: string, scorecards?: IScorecard[]): ITeam {
  return {
    id: -1,
    name,
    scorecards: scorecards || [],
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return !!arg && typeof arg === 'object' && 'id' in arg && 'name' in arg;
}

function addScorecardToTeam(team: ITeam, scorecard: IScorecard): ITeam {
  return {
    ...team,
    scorecards: [...team.scorecards, scorecard],
  };
}

// **** Export default **** //

export default {
  new: new_,
  instanceOf,
  addScorecardToTeam,
} as const;
