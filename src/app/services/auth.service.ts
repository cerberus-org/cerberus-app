import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { setLocalStorageObject } from '../functions/localStorageObject';
import { testUsers, User } from '../models/user';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private organizationService: OrganizationService,
              private userService: UserService) {
    if (afAuth) {
      this.observeStateChanges();
    }
  }

  createUser(user: User): Observable<User> {
    return Observable.fromPromise(this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password))
      .switchMap(afUser => this.userService.add(user, afUser.uid));
  }

  signIn(email: string, password: string): Observable<User> {
    return Observable.fromPromise(this.afAuth.auth
      .signInWithEmailAndPassword(email, password))
      .switchMap(afUser => this.setItems(afUser))
  }

  setItems(afUser: any): Observable<User> {
    return this.userService.getById(afUser.uid)
      .switchMap(user => {
        user = Object.assign({}, user, {
          id: afUser.uid,
          email: afUser.email
        });
        setLocalStorageObject('user', user);
        return this.organizationService.getById(user.organizationId)
          .map(organization => {
            setLocalStorageObject(
              'organization',
              Object.assign({}, organization, { id: user.organizationId })
            );
            return user;
          })
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
        localStorage.clear();
      }
    });
  }
}

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null);
  }

  createUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  signIn(email: string, password: string): Observable<User> {
    return Observable.of(testUsers
      .find(user => user.email === email));
  }

  signOut(): Observable<any> {
    return Observable.empty();
  }
}
