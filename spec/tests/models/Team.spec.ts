import Team from '@src/models/Team';
import Scorecard from '@src/models/Scorecard';

const { addScorecardToTeam, instanceOf } = Team;

describe('Team Test', () => {
  it('should recognize an instance of team', () => {
    const myTeam = Team.new('my team');
    expect(instanceOf(myTeam)).toBe(true);
  });

  it('should create a new scorecard when asked to create a new one', () => {
    const myTeam = Team.new('my team');
    const newScorecard = Scorecard.new('my scorecard');
    const myTeamWithScorecard = addScorecardToTeam(myTeam, newScorecard);
    expect(myTeamWithScorecard.scorecards.length > 0).toBe(true);
  });
});
