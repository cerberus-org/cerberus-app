import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { filterByOrganizationId } from '../../../functions';
import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { mockSites } from '../../../mock/objects/site.mock';
import { getMockVisits } from '../../../mock/objects/visit.mock';
import { getMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
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
    it('should dispatch AuthActions.LoadSitesSuccess', (() => {
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
    it('should dispatch AuthActions.LoadVisitsSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVisits(organizationId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVisitsSuccess(
          filterByOrganizationId(getMockVisits(), organizationId),
        ),
      });
      expect(effects.loadVisits$).toBeObservable(expected);
    }));
  });

  describe('loadVolunteers$', () => {
    it('should dispatch AuthActions.LoadVolunteersSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVolunteers(organizationId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVolunteersSuccess(
          filterByOrganizationId(getMockVolunteers(), organizationId),
        ),
      });
      expect(effects.loadVolunteers$).toBeObservable(expected);
    }));
  });
});
