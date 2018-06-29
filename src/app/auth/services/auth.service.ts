import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MemberService } from '../../data/services/member.service';
import { Member } from '../../models';
import { Credentials } from '../../models/credentials';
import { RootState } from '../../root/store/reducers';
import { ErrorService } from '../../shared/services/error.service';
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

  createUser(credentials: Credentials): Observable<User> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password))
      .pipe(
        catchError(error => this.errorService.handleFirebaseError(error)),
      );
  }

  resetPassword(email: string): Observable<{}> {
    // Do not handle Firebase error for security purposes.
    // We do not want the validMember to know if any email does or does not exist.
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  /**
   * Updates validMember data. Only updates the Firebase validMember if password or email are provided.
   *
   * @param credentials
   * @returns {Observable<Member>}
   */
  updateUser(credentials: Credentials): Observable<User> {
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
        .then((): User => ({ ...currentUser, email })),
    )
      .pipe(
        catchError(error => this.errorService.handleFirebaseError(error)),
      );
  }

  signIn(credentials: Credentials): Observable<User> {
    // Do not use Firebase error for security purposes.
    // We do not want the validMember to know if any account does or does not exist.
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      // Now returns user property nested inside an object
        .then(res => res.user),
    )
      .pipe(catchError(error => this.errorService.handleLoginError(error)));
  }

  /**
   * If the validMember is not logged in, authState returns null.
   * @returns {Observable<boolean>}
   */
  isSignedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => !!auth));
  }

  signOut(): Observable<User> {
    return from(this.afAuth.auth.signOut());
  }

  /**
   * If the page is reloaded or the state of the validMember changes dispatch an action to load data to the root store$.
   */
  observeStateChanges(): void {
    this.afAuth.auth.onAuthStateChanged((user: User) => {
      this.store$.dispatch(
        user
          ? new SessionActions.LoadData(user)
          : new SessionActions.ClearData(),
      );
    });
  }
}
