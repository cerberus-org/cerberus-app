import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { createMockOrganizations } from '../../../../mocks/objects/organization.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import {
  DELETE_VOLUNTEER,
  DELETE_VOLUNTEER_SUCCESS,
  DeleteVolunteer,
  DeleteVolunteerSuccess,
  GENERATE_VISIT_HISTORY_REPORT,
  GenerateVisitHistoryReport,
  LOAD_PAGE,
  LoadPage,
  UPDATE_ORGANIZATION,
  UPDATE_ROLE,
  UPDATE_USER,
  UPDATE_VISITS,
  UpdateOrganization,
  UpdateRole,
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

  it('should create a LoadPage action', () => {
    const payload = 'Test';
    expect({ ...new LoadPage(payload) }).toEqual({
      payload,
      type: LOAD_PAGE,
    });
  });

  it('should create an UpdateOrganization action', () => {
    const payload = createMockOrganizations()[0];
    expect({ ...new UpdateOrganization(payload) }).toEqual({
      payload,
      type: UPDATE_ORGANIZATION,
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
});
