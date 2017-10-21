import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { hot } from 'jasmine-marbles';

import { LoginEffects } from './login.effects';
import { Login } from '../actions/login.actions';
import { MockVisitService, VisitService } from '../services/visit.service';
import { SnackBarService } from '../services/snack-bar.service';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';

describe('LoginEffects', () => {
  let effects: LoginEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions),
        { provide: VisitService, useClass: MockVisitService },
      ],
    });
    effects = TestBed.get(LoginEffects);
  });

  describe('login$', () => {

    it('sets localStorage, navigates to the dashboard, and displays the snackbar, on success', () => {
      const user = testUsers[0];
      const login = new Login(user);
      const navigateByUrlSpy = spyOn(TestBed.get(Router), 'navigateByUrl');
      const loginSuccessSpy = spyOn(TestBed.get(SnackBarService), 'login');

      actions = hot('a', { a: login });

      effects.login$.subscribe(() => {
        expect(localStorage.getItem('token')).toEqual('token');
        expect(localStorage.getItem('userId')).toEqual(user._id);
        expect(localStorage.getItem('userName')).toEqual(user.firstName);
        expect(localStorage.getItem('organizationId')).toEqual(user.organizationId);
        expect(localStorage.getItem('organizationName')).toEqual(testOrganizations[0].name);

        expect(navigateByUrlSpy).toHaveBeenCalledWith('/dashboard');
        expect(loginSuccessSpy).toHaveBeenCalledWith(testUsers[0].firstName);
      });
    });
  });
});
