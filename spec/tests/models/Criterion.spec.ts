import Criterion, { CalculationRuleType } from '@src/models/Criterion';

describe('Criterion test', () => {
  it('should recognize an instance of a criterion', () => {
    const criterion = Criterion.new('NbOfBug', 10, 'Nb Of Bug', {
      type: CalculationRuleType.NONE,
    });
    expect(Criterion.instanceOf(criterion)).toBe(true);
  });
  it('should change the wheight of the selected criteria', () => {
    const criterion = Criterion.new('NbOfBug', 10, 'Nb Of Bug', {
      type: CalculationRuleType.NONE,
    });
    const updatedWheightOfCriterion = Criterion.updateWeightOfCriteria(
      criterion,
      2,
    );
    expect(updatedWheightOfCriterion.weight).toEqual(2);
  });
});
