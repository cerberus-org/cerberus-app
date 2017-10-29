import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';

import { OrganizationService } from './organization.service';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private organizationService: OrganizationService,
              private userService: UserService) {
    if (afAuth) {
      this.observeStateChanges();
    }
  }

  signIn(email: string, password: string): Observable<any> {
    return Observable
      .fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .switchMap(afUser => this.setItems(afUser))
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  setItems(afUser: any): Observable<User> {
    localStorage.setItem('uid', afUser.uid);
    localStorage.setItem('email', afUser.email);
    return this.userService.getById(afUser.uid)
      .switchMap(user => {
        localStorage.setItem('organizationId', user.organizationId);
        return this.organizationService.getById(user.organizationId)
          .map(organization => {
            localStorage.setItem('organizationName', organization.name);
            return user;
          })
      });
  }

  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
      } else {
        localStorage.clear();
      }
    });
  }
}
