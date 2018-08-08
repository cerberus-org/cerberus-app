import { createMockTeams } from '../../../mocks/objects/team.mock';
import { Team } from '../../shared/models';
import { getTeamDashboardHeaderOptions } from './team-dashboard.selectors';
import objectContaining = jasmine.objectContaining;

describe('TeamDashboardSelectors', () => {
  describe('selectTeamDashboardHeaderOptions', () => {
    let team: Team;

    beforeEach(() => {
      team = createMockTeams()[0];
    });

    it('should set the title based on the session team', () => {
      expect(getTeamDashboardHeaderOptions.projector(team))
        .toEqual(objectContaining({
          title: team.name,
        }));
    });

    it('should not set a previous URL', () => {
      expect(getTeamDashboardHeaderOptions.projector(team))
        .toEqual(objectContaining({
          previousUrl: null,
        }));
    });
  });
});
