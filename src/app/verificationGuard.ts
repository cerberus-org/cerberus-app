import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import * as RouterActions from './actions/router.actions';
import { AuthService } from './services/auth.service';
import { State } from './reducers';

@Injectable()
export class VerificationGuard implements CanActivate {

  constructor(private authService: AuthService,
              private store: Store<State>) {}

  public canActivate(): boolean {
    if (this.authService.isPwdValid()) {
      this.authService.setPwdVerification(false);
      return true;
    }
    this.store.dispatch(
      new RouterActions.Go({ path: ['/dashboard'] })
    );
    return false;
  }
}
