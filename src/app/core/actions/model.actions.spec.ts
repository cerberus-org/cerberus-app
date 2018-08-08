import { createMockMembers } from '../../../mocks/objects/member.mock';
import { createMockTeams } from '../../../mocks/objects/team.mock';
import { createMockSites } from '../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import {
  LOAD_MEMBERS,
  LOAD_MEMBERS_SUCCESS,
  LOAD_TEAMS,
  LOAD_TEAMS_SUCCESS,
  LOAD_SITES,
  LOAD_SITES_SUCCESS,
  LOAD_VISITS,
  LOAD_VISITS_SUCCESS,
  LOAD_VOLUNTEERS,
  LOAD_VOLUNTEERS_SUCCESS,
  LoadMembers,
  LoadMembersSuccess,
  LoadTeams,
  LoadTeamsSuccess,
  LoadSites,
  LoadSitesSuccess,
  LoadVisits,
  LoadVisitsSuccess,
  LoadVolunteers,
  LoadVolunteersSuccess,
} from './model.actions';

describe('model.actions', () => {
  it('should create a LoadMembers action', () => {
    const payload = 'Test';
    expect({ ...new LoadMembers(payload) }).toEqual({
      payload,
      type: LOAD_MEMBERS,
    });
  });

  it('should create a LoadSitesSuccess action', () => {
    const payload = createMockMembers();
    expect({ ...new LoadMembersSuccess(payload) }).toEqual({
      payload,
      type: LOAD_MEMBERS_SUCCESS,
    });
  });

  it('should create a LoadSites action', () => {
    const payload = 'Test';
    expect({ ...new LoadSites(payload) }).toEqual({
      payload,
      type: LOAD_SITES,
    });
  });

  it('should create a LoadSitesSuccess action', () => {
    const payload = createMockSites();
    expect({ ...new LoadSitesSuccess(payload) }).toEqual({
      payload,
      type: LOAD_SITES_SUCCESS,
    });
  });

  it('should create a LoadVisits action', () => {
    const payload = 'Test';
    expect({ ...new LoadVisits(payload) }).toEqual({
      payload,
      type: LOAD_VISITS,
    });
  });

  it('should create a LoadVisitsSuccess action', () => {
    const payload = createMockVisits();
    expect({ ...new LoadVisitsSuccess(payload) }).toEqual({
      payload,
      type: LOAD_VISITS_SUCCESS,
    });
  });

  it('should create a LoadVolunteers action', () => {
    const payload = 'Test';
    expect({ ...new LoadVolunteers(payload) }).toEqual({
      payload,
      type: LOAD_VOLUNTEERS,
    });
  });

  it('should create a LoadVisitsSuccess action', () => {
    const payload = createMockVolunteers();
    expect({ ...new LoadVolunteersSuccess(payload) }).toEqual({
      payload,
      type: LOAD_VOLUNTEERS_SUCCESS,
    });
  });

  it('should create a LoadTeams action', () => {
    expect({ ...new LoadTeams() }).toEqual({
      type: LOAD_TEAMS,
    });
  });

  it('should create a LoadTeamsSuccess action', () => {
    const payload = createMockTeams();
    expect({ ...new LoadTeamsSuccess(payload) }).toEqual({
      payload,
      type: LOAD_TEAMS_SUCCESS,
    });
  });
});
