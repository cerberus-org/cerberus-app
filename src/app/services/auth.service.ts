import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FbUser } from 'firebase';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/index';

import * as AuthActions from '../actions/auth.actions';
import { testFirebaseUsers, User } from '../models';
import { State } from '../reducers';
import { ErrorService } from './error.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  pwdVerification: boolean;
  user: User;

  constructor(private afAuth: AngularFireAuth,
              private errorService: ErrorService,
              private userService: UserService,
              private store: Store<State>) {
    this.pwdVerification = false;
    if (afAuth) {
      this.observeStateChanges();
    }
  }

  setPwdVerification(val: boolean) {
    this.pwdVerification = val;
  }

  isPwdValid(): boolean {
    return this.pwdVerification;
  }

  createUser(user: User): Observable<{}> {
    return Observable.fromPromise(this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password))
      .switchMap(afUser => this.userService.add(user, afUser.uid))
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  resetPassword(email: string): Observable<{}> {
    // Do not handle Firebase error for security purposes.
    // We do not want the user to know if any email does or does not exist.
    return Observable.fromPromise(this.afAuth.auth
      .sendPasswordResetEmail(email));
  }

  /**
   * Updates user data. Only updates the Firebase user if password or email are provided.
   * @param user
   * @returns {Observable<User>}
   */
  updateUser(user: User): Observable<{}> {
    const currentUser = this.afAuth.auth.currentUser;
    const updates = [];
    if (user.password) {
      updates.push(currentUser.updatePassword(user.password));
    }
    if (user.email) {
      updates.push(currentUser.updateEmail(user.email));
    }
    return Observable.fromPromise(Promise.all(updates))
      .switchMap(() => this.userService.update(user))
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  signIn(email: string, password: string): Observable<FbUser> {
    // Do not use Firebase error for security purposes.
    // We do not want the user to know if any account does or does not exist.
    return Observable.fromPromise(this.afAuth.auth
      .signInWithEmailAndPassword(email, password))
      .catch(error => this.errorService.handleLoginError(error));
  }

  /**
   * If the user is not logged in, authState returns null.
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.map(auth => !!auth);
  }

  signOut(): Observable<FbUser> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  /**
   * If the page is reloaded or the state of the user changes dispatch an action to load data to the app store.
   */
  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.store.dispatch(
        user
          ? new AuthActions.LoadData(user)
          : new AuthActions.LoadDataSuccess({ user: null, organization: null }),
      );
    });
  }
}

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null);
  }

  createUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  updateUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  signIn(email: string, password: string): Observable<any> {
    return Observable.of(testFirebaseUsers[0]);
  }

  signOut(): Observable<FbUser> {
    return Observable.of(null);
  }
}
