import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { mockOrganizations } from '../../../../mocks/objects/organization.mock';
import { mockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockServiceProviders } from '../../../../mocks/providers.mock';
import { filterByOrganizationId } from '../../../shared/helpers';
import * as ModelActions from '../actions/model.actions';
import { ModelEffects } from './model.effects';

describe('ModelEffects', () => {
  let effects: ModelEffects;
  let actions: Observable<any>;
  const organizationId: string = mockOrganizations[0].id;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      providers: [
        ModelEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
    });
    effects = TestBed.get(ModelEffects);
  }));

  describe('loadSites$', () => {
    it('should dispatch SessionActions.LoadSitesSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadSites(organizationId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadSitesSuccess(
          filterByOrganizationId(mockSites, organizationId),
        ),
      });
      expect(effects.loadSites$).toBeObservable(expected);
    }));
  });

  describe('loadVisits$', () => {
    it('should dispatch SessionActions.LoadVisitsSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVisits(organizationId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVisitsSuccess(
          filterByOrganizationId(createMockVisits(), organizationId),
        ),
      });
      expect(effects.loadVisits$).toBeObservable(expected);
    }));
  });

  describe('loadVolunteers$', () => {
    it('should dispatch SessionActions.LoadVolunteersSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVolunteers(organizationId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVolunteersSuccess(
          filterByOrganizationId(createMockVolunteers(), organizationId),
        ),
      });
      expect(effects.loadVolunteers$).toBeObservable(expected);
    }));
  });
});
