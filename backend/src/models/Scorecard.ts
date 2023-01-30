import { TAll } from 'jet-validator';


// **** Types **** //

export interface IScorecard {
  id: number;
  name: string;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(
  name: string,
): IScorecard {
  return {
    id: -1,
    name,
  };
}

/**
 * Copy a user object.
 */
function duplicateScorecard(scorecard: IScorecard): IScorecard {
  return {
    id: -1,
    name: scorecard.name,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'name' in arg 
  );
}


// **** Export default **** //

export default {
  new: new_,
  duplicateScorecard,
  instanceOf,
} as const;
