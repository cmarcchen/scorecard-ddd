import Scorecard, { IScorecard } from '@src/models/Scorecard';
import Team from '@src/models/Team';

const { instanceOf, duplicateScorecard } = Scorecard;

describe('Scorecard Test', () => {
  it('should recognize an instance of scorecard', () => {
    const myScorecard = Scorecard.new('my scorecard');
    expect(instanceOf(myScorecard)).toBe(true);
  });
  it('should duplicate a scorecard', () => {
    const myFirstScorecard = Scorecard.new('my first scorecard');
    const myDuplicateScorecard = duplicateScorecard(myFirstScorecard);

    expect(myDuplicateScorecard).toEqual({
      ...myFirstScorecard,
      name: `${myFirstScorecard.name} copy`,
    });
  });
  it('should add the correct scorecard to team', () => {
    const teamA = Team.new('MMM');
    const scorecard = Scorecard.new('Nov-22');
    const teamAWithScorecard = Team.addScorecardToTeam(teamA, scorecard);
    expect(teamAWithScorecard.scorecards).toEqual([scorecard]);
  });
  it('when duplicate should assign another team', () => {
    const teamA = Team.new('MMM');
    const teamB = Team.new('dotCom');
    const scorecardToDuplicate: IScorecard = Scorecard.new('scorecardTeamA');
    const teamAWithScorecard = Team.addScorecardToTeam(
      teamA,
      scorecardToDuplicate,
    );
    const teamBWithDuplicatedScorecard = Team.addScorecardToTeam(
      teamB,
      Scorecard.duplicateScorecard(teamAWithScorecard.scorecards[0]),
    );
    expect(teamBWithDuplicatedScorecard.scorecards[0].name).toEqual(
      `${teamAWithScorecard.scorecards[0].name} copy`,
    );
  });
});
