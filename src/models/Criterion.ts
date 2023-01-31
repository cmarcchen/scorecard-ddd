import { TAll } from 'jet-validator';

enum CalculationRuleType {
  DIRECT,
  THRESHOLD,
  NONE,
}

type CalculationRule = 
| ThresholdCalculationRule 
| DirectCalculationRule 
| NoneCalculationRule

export interface ThresholdCalculationRule  {
  type: CalculationRuleType.THRESHOLD;
  ruleSet: Array<{ thresholdPoint: number; score: number }>;
}

export interface DirectCalculationRule {
  type: CalculationRuleType.DIRECT
  ruleSet: Record<string, number | undefined>
}

export interface NoneCalculationRule {
  type: CalculationRuleType.NONE
}

// **** Types **** //

export interface ICriterion {
  id: number;
  name: string;
  weight: number;
  description: string;
  calculationRule: CalculationRule;
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(
  name: string,
  weight: number,
  description: string,
  calculationRule: CalculationRule,
): ICriterion {
  return {
    id: -1,
    name,
    weight,
    description,
    calculationRule,
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
  instanceOf,
} as const;
