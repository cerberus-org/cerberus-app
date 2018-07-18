import { UserInfo } from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Credentials } from '../../models/credentials';
import { createMockUserInfo } from '../objects/user.mock';

const getUserInfoByCredentials = credentials =>
  createMockUserInfo().find(user => user.email === credentials.email);

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null);
  }

  createUser(credentials: Credentials): Observable<UserInfo> {
    return of(getUserInfoByCredentials(credentials));
  }

  updateUser(credentials: Credentials): Observable<UserInfo> {
    return of({ ...createMockUserInfo()[0], email: credentials.email });
  }

  resetPassword(email: string): Observable<void> {
    return of(null);
  }

  signIn(credentials: Credentials): Observable<UserInfo> {
    return of(getUserInfoByCredentials(credentials));
  }

  signOut(): Observable<void> {
    return of(null);
  }
}
