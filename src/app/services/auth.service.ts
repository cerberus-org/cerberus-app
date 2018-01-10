import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import { setLocalStorageObject } from '../functions/localStorageObject';
import { testUsers, User } from '../models/user';
import { State } from '../reducers/app.reducer';
import { ErrorService } from './error.service';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  pwdVerification: boolean;
  user: any;

  constructor(private afAuth: AngularFireAuth,
              private errorService: ErrorService,
              private organizationService: OrganizationService,
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

  createUser(user: User): Observable<User> {
    return Observable.fromPromise(this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password))
      .switchMap(afUser => this.userService.add(user, afUser.uid))
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * Update auth user and base user. Only update the password if provided.
   * @param user
   * @returns {Observable<User>}
   */
  updateUser(user: any): Observable<any> {
    const currentUser = this.afAuth.auth.currentUser;
    if (user.password) {
      this.updatePassword(user, currentUser);
    }
    return Observable.fromPromise(currentUser
      .updateEmail(user.email))
      .switchMap(() => this.userService.update(user))
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  updatePassword(user: any, currentUser: any) {
    return Observable.fromPromise(currentUser
      .updatePassword(user.password));
  }

  signIn(email: string, password: string): Observable<User> {
    return Observable.fromPromise(this.afAuth.auth
      .signInWithEmailAndPassword(email, password))
      .switchMap(afUser => this.setLocalStorageOnSignIn(afUser))
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * If the user is not logged in, authState returns null.
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.map(auth => !!auth);
  }

  /**
   * Set user and organization in local storage on sign in.
   * @param afUser
   * @returns {Observable<User>}
   */
  setLocalStorageOnSignIn(afUser: any): Observable<User> {
    return this.userService.getById(afUser.uid)
      .switchMap(res => {
        // Add Firebase uid and email to base user object
        const user = Object.assign({}, res, {
          id: afUser.uid,
          email: afUser.email
        });
        setLocalStorageObject('user', user);
        // Get organization id associated with user
        return this.organizationService.getById(user.organizationId)
          .map(organization => {
            setLocalStorageObject(
              'organization',
              // Add organization id to base user object
              Object.assign({}, organization, { id: user.organizationId })
            );
            return user;
          })
      });
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  /**
   * If the page is reloaded or the state of the user changes dispatch an action to load data to the app store.
   */
  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.store.dispatch(new AppActions.LoadData({ user }));
      } else {
        // If the user is not logged in, set data to null
        this.store.dispatch(new AppActions.LoadDataSuccess({ user: null, organization: null }));
      }
    });
  }
}

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null, null);
  }

  createUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  updateUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  signIn(email: string, password: string): Observable<User> {
    return Observable.of(testUsers
      .find(user => user.email === email));
  }

  signOut(): Observable<any> {
    return Observable.of(null);
  }
}
