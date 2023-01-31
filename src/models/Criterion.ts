import { TAll } from 'jet-validator';

export enum CalculationRuleType {
  DIRECT,
  THRESHOLD,
  NONE,
}

export interface CalculationRule {
  type: CalculationRuleType;
  ruleSet?: any;
}

export interface ThresholdCalculationRule extends CalculationRule {
  type: CalculationRuleType.THRESHOLD;
  ruleSet: Array<{ thresholdPoint: number; score: number }>;
}

export interface DirectCalculationRule extends CalculationRule {
  type: CalculationRuleType.DIRECT;
  ruleSet: Record<string, number | undefined>;
}

export interface NoneCalculationRule extends CalculationRule {
  type: CalculationRuleType.NONE;
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
function updateWeightOfCriteria(
  criterion: ICriterion,
  weight: number,
): ICriterion {
  return { ...criterion, weight };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'name' &&
    'weight' &&
    'description' &&
    'calculationRule' in arg
  );
}

// **** Export default **** //

export default {
  new: new_,
  updateWeightOfCriteria,
  instanceOf,
} as const;
