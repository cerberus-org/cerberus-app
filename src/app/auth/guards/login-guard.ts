import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RouterActions from '../../core/store/actions/router.actions';
import { RootState } from '../../core/store/reducers';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private store$: Store<RootState>) {}

  canActivate(): Observable<boolean> {
    // Get observable
    const isLoggedIn$ = this.authService.isSignedIn();
    // Subscribe to observable so appropriate action can be taken upon completion
    isLoggedIn$.subscribe((val) => {
      if (!val) {
        this.store$.dispatch(new RouterActions.Go({ path: ['/home'] }));
      }
    });
    // Observable will not be returned until completed
    return isLoggedIn$;
  }
}
