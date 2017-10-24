import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';

import { UserService } from './user.service';
import { OrganizationService } from './organization.service';
import { SnackBarService } from './snack-bar.service';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private organizationService: OrganizationService,
              private snackbarService: SnackBarService,
              private userService: UserService) {
    this.observeStateChanges();
  }

  signIn(email: string, password: string): Observable<void> {
    return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signOut(): Observable<void> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        localStorage.setItem('email', user.email);
        localStorage.setItem('displayName', user.displayName);
        localStorage.setItem('uid', user.uid);
        this.userService.getById(user.uid)
          .map(user => {
            localStorage.setItem('organizationId', user.organizationId);
            this.organizationService.getById(user.organizationId)
              .do(organization => {
                localStorage.setItem('organizationName', organization.name);
                this.snackbarService.loginSuccess(user.firstName);
              })
          });
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('displayName');
        localStorage.removeItem('uid');
        localStorage.removeItem('organizationId');
        localStorage.removeItem('organizationName');
        this.snackbarService.logoutSuccess();
      }
    });
  }
}
