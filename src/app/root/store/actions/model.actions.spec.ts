import { createMockMembers } from '../../../mock/objects/member.mock';
import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockSites } from '../../../mock/objects/site.mock';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { createMockVolunteers } from '../../../mock/objects/volunteer.mock';
import {
  LOAD_MEMBERS,
  LOAD_MEMBERS_SUCCESS,
  LOAD_ORGANIZATIONS,
  LOAD_ORGANIZATIONS_SUCCESS,
  LOAD_SITES, LOAD_SITES_SUCCESS,
  LOAD_VISITS,
  LOAD_VISITS_SUCCESS,
  LOAD_VOLUNTEERS,
  LOAD_VOLUNTEERS_SUCCESS,
  LoadMembers,
  LoadMembersSuccess,
  LoadOrganizations,
  LoadOrganizationsSuccess,
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

  it('should create a LoadOrganizations action', () => {
    expect({ ...new LoadOrganizations() }).toEqual({
      type: LOAD_ORGANIZATIONS,
    });
  });

  it('should create a LoadOrganizationsSuccess action', () => {
    const payload = createMockOrganizations();
    expect({ ...new LoadOrganizationsSuccess(payload) }).toEqual({
      payload,
      type: LOAD_ORGANIZATIONS_SUCCESS,
    });
  });
});
