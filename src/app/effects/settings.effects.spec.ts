import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { AuthService, MockAuthService } from '../services/auth.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  const actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: OrganizationService, useClass: MockOrganizationService }
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
});
