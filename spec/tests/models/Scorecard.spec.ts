import Scorecard, { IScorecard } from '@src/models/Scorecard';
import Team from '@src/models/Team';

const { instanceOf, duplicateScorecard } = Scorecard;

describe('Scorecard Test', () => {
  it('should recognize an instance of scorecard', () => {
    const team = Team.new('MMM');
    const myScorecard = Scorecard.new('my scorecard', team);
    expect(instanceOf(myScorecard)).toBe(true);
  });
  it('should duplicate a scorecard', () => {
    const team = Team.new('MMM');
    const myFirstScorecard = Scorecard.new('my first scorecard', team);
    const myDuplicateScorecard = duplicateScorecard(myFirstScorecard, team);

    expect(myDuplicateScorecard).toEqual({
      ...myFirstScorecard,
      name: `${myFirstScorecard.name} copy`,
    });
  });
  it('when duplicate should assign another team', () => {
    const teamA = Team.new('MMM');
    const teamB = Team.new('dotCom');
    const scorecardToDuplicate: IScorecard = Scorecard.new(
      'scorecardTeamA',
      teamA
    );
    const duplicatedScorecard: IScorecard = Scorecard.duplicateScorecard(
      scorecardToDuplicate,
      teamB
    );
    expect(duplicatedScorecard.team).toEqual(teamB);
  });
});
