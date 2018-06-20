import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/index';

import * as RouterActions from '../store/actions/router.actions';
import { State } from '../store/reducers/index';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    // Get observable
    const isLoggedIn$ = this.authService.isLoggedIn();
    // Subscribe to observable so appropriate action can be taken upon completion
    isLoggedIn$.subscribe((val) => {
      if (!val) {
        this.store.dispatch(new RouterActions.Go({ path: ['/home'] }));
      }
    });
    // Observable will not be returned until completed
    return isLoggedIn$;
  }
}
