import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, UserInfo } from 'firebase';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MemberService } from '../../core/services/member.service';
import { Member } from '../../shared/models';
import { Credentials } from '../../shared/models/credentials';
import { RootState } from '../../core/store/reducers';
import { ErrorService } from '../../core/services/error.service';
import * as SessionActions from '../store/actions/session.actions';

@Injectable()
export class AuthService {
  pwdVerification: boolean;
  user: Member;

  constructor(
    private afAuth: AngularFireAuth,
    private errorService: ErrorService,
    private memberService: MemberService,
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

  createUser(credentials: Credentials): Observable<UserInfo> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password))
      .pipe(
        map(userCredential => userCredential.user as UserInfo),
        catchError(error => this.errorService.handleFirebaseError(error)),
      );
  }

  resetPassword(email: string): Observable<void> {
    // Do not handle Firebase error for security purposes.
    // We do not want the user to know if any email does or does not exist.
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  /**
   * Updates user data. Only updates the Firebase user if password or email are provided.
   *
   * @param credentials
   * @returns {Observable<Member>}
   */
  updateUser(credentials: Credentials): Observable<UserInfo> {
    const currentUser: User = this.afAuth.auth.currentUser;
    const { password, email } = credentials;
    const updates = [];
    if (password) {
      updates.push(currentUser.updatePassword(password));
    }
    if (email) {
      updates.push(currentUser.updateEmail(email));
    }
    return from(
      Promise.all(updates)
        .then((): UserInfo => (Object.assign({}, currentUser, email))),
    )
      .pipe(
        catchError(error => this.errorService.handleFirebaseError(error)),
      );
  }

  signIn(credentials: Credentials): Observable<UserInfo> {
    // Do not use Firebase error for security purposes.
    // We do not want the user to know if any account does or does not exist.
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      // Now returns userInfo property nested inside an object
        .then(res => res.user),
    )
      .pipe(catchError(error => this.errorService.handleLoginError(error)));
  }

  /**
   * If the user is not logged in, authState returns null.
   * @returns {Observable<boolean>}
   */
  isSignedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => !!auth));
  }

  signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  /**
   * If the page is reloaded or the state of the user changes dispatch an action to load data to the core store$.
   */
  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged((user: User) => {
      this.store$.dispatch(
        user
          ? new SessionActions.LoadData(user as UserInfo)
          : new SessionActions.ClearData(),
      );
    });
  }
}
