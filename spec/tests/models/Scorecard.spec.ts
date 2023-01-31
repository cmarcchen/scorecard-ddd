import Scorecard from "@src/models/Scorecard";

const {instanceOf, duplicateScorecard,} = Scorecard

describe('Scorecard Test', () => {
  it('should recognize an instance of scorecard', () => {
    const myScorecard = Scorecard.new("my scorecard")
    expect(instanceOf(myScorecard)).toBe(true)
  });
  it('should duplicate a scorecard', () => {
    const myFirstScorecard = Scorecard.new("my first scorecard")
    const myDuplicateScorecard = duplicateScorecard(myFirstScorecard)

    expect(myDuplicateScorecard).toEqual({...myFirstScorecard, name: `${myFirstScorecard.name} copy`})
  }) 
});