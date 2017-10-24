import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';

import { UserService } from './user.service';
import { OrganizationService } from './organization.service';
import { SnackBarService } from './snack-bar.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private snackBarService: SnackBarService,
              private organizationService: OrganizationService,
              private userService: UserService) {
    this.observeStateChanges();
  }

  signIn(email: string, password: string): Observable<User> {
    return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .switchMap(user => {
        // User is signed in.
        localStorage.setItem('email', user.email);
        localStorage.setItem('displayName', user.displayName);
        localStorage.setItem('uid', user.uid);
        return this.userService.getById(user.uid)
          .switchMap(user => {
            localStorage.setItem('organizationId', user.organizationId);
            return this.organizationService.getById(user.organizationId)
              .map(organization => {
                localStorage.setItem('organizationName', organization.name);
                return user;
              })
          });
      });
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('displayName');
        localStorage.removeItem('uid');
        localStorage.removeItem('organizationId');
        localStorage.removeItem('organizationName');
      }
    });
  }
}
