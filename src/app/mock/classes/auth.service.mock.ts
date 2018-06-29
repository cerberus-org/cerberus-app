import { UserInfo } from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Credentials } from '../../models/credentials';
import { createMockUserInfo } from '../objects/user.mock';

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null);
  }

  createUser(credentials: Credentials): Observable<UserInfo> {
    return of(createMockUserInfo().find(user => user.email === credentials.email));
  }

  updateUser(credentials: Credentials): Observable<UserInfo> {
    return of({ ...createMockUserInfo()[0], credentials });
  }

  resetPassword(email: string): Observable<{}> {
    return of(null);
  }

  signIn(credentials: Credentials): Observable<any> {
    return of(createMockUserInfo().find(user => user.email === credentials.email));
  }

  signOut(): Observable<UserInfo> {
    return of(null);
  }
}
