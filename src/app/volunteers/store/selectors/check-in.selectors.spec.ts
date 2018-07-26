import { createMockOrganizations } from '../../../../mocks/objects/organization.mock';
import { selectGettingStartedReducerState } from '../../../public/store/selectors/sign-up.selectors';
import { Organization } from '../../../shared/models';
import { initialCheckInReducerState } from '../reducers/check-in.reducer';
import { selectCheckInHeaderOptions, selectSelectedTabIndex } from './check-in.selectors';
import objectContaining = jasmine.objectContaining;

describe('CheckInSelectors', () => {
  describe('selectCheckInReducerState', () => {
    it('should select the checkIn reducer state', () => {
      const state = initialCheckInReducerState;
      expect(selectGettingStartedReducerState.projector({
        gettingStarted: state,
      }))
        .toEqual(state);
    });
  });

  describe('selectSelectedTabIndex', () => {
    it('should select the selected tab index', () => {
      const state = initialCheckInReducerState;
      expect(selectSelectedTabIndex.projector(state))
        .toEqual(state.selectedTabIndex);
    });
  });

  describe('selectCheckInHeaderOptions', () => {
    let organization: Organization;

    beforeEach(() => {
      organization = createMockOrganizations()[0];
    });

    it('should set the title based on the session organization', () => {
      expect(selectCheckInHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          title: organization.name,
        }));
    });

    it('should set dashboard as the previous URL', () => {
      expect(selectCheckInHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          previousUrl: 'dashboard',
        }));
    });

    it('should show the settings button', () => {
      expect(selectCheckInHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          showSettings: true,
        }));
    });
  });
});
