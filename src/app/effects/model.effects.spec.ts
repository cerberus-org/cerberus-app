import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import * as ModelActions from '../actions/model.actions';
import { filterByOrganizationId } from '../functions/helpers';
import { testOrganizations } from '../models/organization';
import { testSites } from '../models/site';
import { testVisits } from '../models/visit';
import { testVolunteers } from '../models/volunteer';
import { mockServices } from './mock-services';
import { ModelEffects } from './model.effects';

describe('ModelEffects', () => {
  let effects: ModelEffects;
  let actions: Observable<any>;
  const organizationId: string = testOrganizations[0].id;

  beforeEach(async(() => {
    actions = Observable.of('');
    TestBed.configureTestingModule({
      providers: [
        ModelEffects,
        provideMockActions(() => actions),
      ].concat(mockServices),
    });
    effects = TestBed.get(ModelEffects);
  }));

  describe('loadSites$', () => {
    it('should dispatch AuthActions.LoadSitesSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadSites(organizationId)
      });
      const expected = cold('b', {
        b: new ModelActions.LoadSitesSuccess(
          filterByOrganizationId(testSites, organizationId)
        )
      });
      expect(effects.loadSites$).toBeObservable(expected);
    }));
  });

  describe('loadVisits$', () => {
    it('should dispatch AuthActions.LoadVisitsSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVisits(organizationId)
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVisitsSuccess(
          filterByOrganizationId(testVisits, organizationId)
        )
      });
      expect(effects.loadVisits$).toBeObservable(expected);
    }));
  });

  describe('loadVolunteers$', () => {
    it('should dispatch AuthActions.LoadVolunteersSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVolunteers(organizationId)
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVolunteersSuccess(
          filterByOrganizationId(testVolunteers, organizationId)
        )
      });
      expect(effects.loadVolunteers$).toBeObservable(expected);
    }));
  });
});