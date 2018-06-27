import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../data/services/user.service';
import { User } from '../../models';
import { RootState } from '../../root/store/reducers';
import { ErrorService } from '../../shared/services/error.service';
import * as SessionActions from '../store/actions/session.actions';

@Injectable()
export class AuthService {

  pwdVerification: boolean;
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private errorService: ErrorService,
    private userService: UserService,
    private store$: Store<RootState>,
  ) {
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
    return from(this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap((firebaseUser: FirebaseUser) => this.userService.add(user, firebaseUser.uid)),
        catchError(error => this.errorService.handleFirebaseError(error)),
      );
  }

  resetPassword(email: string): Observable<{}> {
    // Do not handle Firebase error for security purposes.
    // We do not want the user to know if any email does or does not exist.
    return from(this.afAuth.auth
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
    return from(Promise.all(updates))
      .pipe(
        switchMap(() => this.userService.update(user)),
        catchError(error => this.errorService.handleFirebaseError(error)),
      );
  }

  signIn(email: string, password: string): Observable<FirebaseUser> {
    // Do not use Firebase error for security purposes.
    // We do not want the user to know if any account does or does not exist.
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      // Now returns user property nested inside an object
        .then(res => res.user),
    )
      .pipe(catchError(error => this.errorService.handleLoginError(error)));
  }

  /**
   * If the user is not logged in, authState returns null.
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => !!auth));
  }

  signOut(): Observable<FirebaseUser> {
    return from(this.afAuth.auth.signOut());
  }

  /**
   * If the page is reloaded or the state of the user changes dispatch an action to load data to the root store$.
   */
  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged((user: FirebaseUser) => {
      this.store$.dispatch(
        user
          ? new SessionActions.LoadData(user)
          : new SessionActions.LoadDataSuccess({ user: null, organization: null }),
      );
    });
  }
}
