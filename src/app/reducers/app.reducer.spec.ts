import * as AppActions from '../actions/app.actions';
import { testHeaderOptions } from '../models/header-options';
import { testOrganizations } from '../models/organization';
import { testSidenavOptions } from '../models/sidenav-options';
import { testUsers } from '../models/user';
import * as fromApp from './app.reducer';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, {
      sidenavOptions: ['a', 'b'],
      headerOptions: testHeaderOptions[0]
    });
  });

  describe('SET_HEADER_OPTIONS', () => {

    it('sets the header options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetHeaderOptions(testHeaderOptions[0])
      );
      expect(state.headerOptions).toEqual(testHeaderOptions[0]);
    });
  });

  describe('SET_SIDENAV_OPTIONS', () => {

    it('sets the sidenav options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetSidenavOptions(testSidenavOptions)
      );
      expect(state.sidenavOptions).toEqual(testSidenavOptions);
    });
  });

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads the User and Organization', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.LoadDataSuccess({ user: testUsers[0], organization: testOrganizations[0] })
      );
      expect(state.user).toEqual(testUsers[0]);
      expect(state.organization).toEqual(testOrganizations[0]);
    });
  });

  describe('SET_ORGANIZATION', () => {

    it('loads the Organization', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetOrganization(testOrganizations[0])
      );
      expect(state.organization).toEqual(testOrganizations[0]);
    });
  });

  describe('SET_USER', () => {

    it('loads the User', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetUser(testUsers[0])
      );
      expect(state.user).toEqual(testUsers[0]);
    });
  });
});
