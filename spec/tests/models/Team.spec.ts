import Team from "@src/models/Team";

const {instanceOf} = Team

describe('Team Test', () => {
  it('should recognize an instance of team', () => {
    const myTeam = Team.new("my team")
    expect(instanceOf(myTeam)).toBe(true)
  });

});