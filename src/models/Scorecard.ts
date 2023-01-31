import { TAll } from 'jet-validator';
import { ICriterion } from './Criterion';
import { addOneMonth } from '@src/util/misc';

// **** Types **** //
export interface IMonthMetrics {
  month: string;
  metrics: (string | number)[];
}
export interface IScorecard {
  id: number;
  name: string;
  criteria: ICriterion[];
  monthMetrics: IMonthMetrics[];
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(
  name: string,
  criteria?: ICriterion[],
  monthMetrics?: IMonthMetrics[],
): IScorecard {
  return {
    id: -1,
    name,
    criteria: criteria || [],
    monthMetrics: monthMetrics || [],
  };
}
function assignCriteria(
  scorecard: IScorecard,
  criterion: ICriterion,
): IScorecard {
  return { ...scorecard, criteria: [...scorecard.criteria, criterion] };
}

function incrementByOneMonth(scorecard: IScorecard): IScorecard {
  return {
    ...scorecard,
    monthMetrics: [
      ...scorecard.monthMetrics,
      {
        month: addOneMonth(scorecard.monthMetrics.slice(-1)[0].month),
        metrics: scorecard.monthMetrics.slice(-1)[0].metrics,
      },
    ],
  };
}

/**
 * Copy a user object.
 */
function duplicateScorecard(scorecard: IScorecard): IScorecard {
  return {
    ...scorecard,
    id: -1,
    name: `${scorecard.name} copy`,
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
  incrementByOneMonth,
  instanceOf,
} as const;
