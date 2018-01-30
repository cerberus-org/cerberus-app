import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { cold, hot } from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import * as SettingsActions from '../actions/settings.actions';
import { testVisits } from '../models/visit';
import { AuthService, MockAuthService } from '../services/auth.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = Observable.of('');
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: VisitService, useClass: MockVisitService },
      ],
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateUser$', () => {

    it('should emit updateUserSuccess snackbar, on success', (() => {
      const updateUserSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateUserSuccess');

      effects.updateUser$.subscribe(() => {
        expect(updateUserSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('updateOrganization$', () => {

    it('should emit updateOrganizationSuccess snackbar, on success', (() => {
      const updateOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateOrganizationSuccess');

      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('loadVisitsByDateAndOrganization$', () => {

    it('should emit loadVisitsByDateAndOrganizationSuccess, on success', (() => {
      const loadVisitsByDate = new SettingsActions.LoadVisitsByDateAndOrganization({
        startedAt: new Date('2017-06-29T10:45:02.336Z'),
        endedAt: new Date('2017-07-03T23:45:01.336Z'),
        organizationId: '59a7055733bfe28af47cff40'
      });
      const loadVisitsByDateSuccess = new SettingsActions.LoadVisitsByDateAndOrganizationSuccess(testVisits);

      actions = hot('a', { a: loadVisitsByDate });
      const expected = cold('b', { b: loadVisitsByDateSuccess });

      expect(effects.loadVisitsByDateAndOrganization$).toBeObservable(expected);
    }));
  });
});
