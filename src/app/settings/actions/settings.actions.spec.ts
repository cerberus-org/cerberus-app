import { createMockCredentials } from '../../../mocks/objects/credentials.mock';
import { createMockMembers } from '../../../mocks/objects/member.mock';
import { createMockSites } from '../../../mocks/objects/site.mock';
import { createMockTeams } from '../../../mocks/objects/team.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import {
  CREATE_SITE,
  CreateSite,
  DELETE_VOLUNTEER,
  DELETE_VOLUNTEER_SUCCESS,
  DeleteVolunteer,
  DeleteVolunteerSuccess,
  GENERATE_VISIT_HISTORY_REPORT,
  GenerateVisitHistoryReport,
  LOAD_PAGE,
  LoadSettingsPage,
  UPDATE_ROLE,
  UPDATE_TEAM,
  UPDATE_USER,
  UPDATE_VISITS,
  UpdateRole,
  UpdateTeam,
  UpdateUser,
  UpdateVisits,
} from './settings.actions';

describe('settings.actions', () => {
  it('should create a DeleteVolunteer action', () => {
    const payload = createMockVolunteers()[0];
    expect({ ...new DeleteVolunteer(payload) }).toEqual({
      payload,
      type: DELETE_VOLUNTEER,
    });
  });

  it('should create a DeleteVolunteerSuccess action', () => {
    const payload = createMockVolunteers()[0];
    expect({ ...new DeleteVolunteerSuccess(payload) }).toEqual({
      payload,
      type: DELETE_VOLUNTEER_SUCCESS,
    });
  });

  it('should create a GenerateVisitHistoryReport action', () => {
    const payload = {
      startedAt: new Date('2017-06-29T10:45:02.336Z'),
      endedAt: new Date('2017-06-29T14:45:02.336Z'),
    };
    expect({ ...new GenerateVisitHistoryReport(payload) }).toEqual({
      payload,
      type: GENERATE_VISIT_HISTORY_REPORT,
    });
  });

  it('should create a LoadSettingsPage action', () => {
    const payload = 'Test';
    expect({ ...new LoadSettingsPage(payload) }).toEqual({
      payload,
      type: LOAD_PAGE,
    });
  });

  it('should create an UpdateTeam action', () => {
    const payload = createMockTeams()[0];
    expect({ ...new UpdateTeam(payload) }).toEqual({
      payload,
      type: UPDATE_TEAM,
    });
  });

  it('should create an UpdateUser action', () => {
    const payload = {
      credentials: createMockCredentials()[0],
      member: createMockMembers()[0],
    };
    expect({ ...new UpdateUser(payload) }).toEqual({
      payload,
      type: UPDATE_USER,
    });
  });

  it('should create an UpdateRole action', () => {
    const payload = createMockMembers()[0];
    expect({ ...new UpdateRole(payload) }).toEqual({
      payload,
      type: UPDATE_ROLE,
    });
  });

  it('should create an UpdateVisits action', () => {
    const payload = createMockVisits();
    expect({ ...new UpdateVisits(payload) }).toEqual({
      payload,
      type: UPDATE_VISITS,
    });
  });

  it('should create an CreateSite action', () => {
    const payload = createMockSites()[0];
    expect({ ...new CreateSite(payload) }).toEqual({
      payload,
      type: CREATE_SITE,
    });
  });
});
