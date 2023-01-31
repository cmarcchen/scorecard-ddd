import { TAll } from 'jet-validator';


// **** Types **** //

export interface ITeam {
  id: number;
  name: string;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(
  name: string,
): ITeam {
  return {
    id: -1,
    name,
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
  instanceOf,
} as const;
