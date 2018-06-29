import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Credentials } from '../../models/credentials';
import { createMockUsers } from '../objects/user.mock';

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null);
  }

  createUser(credentials: Credentials): Observable<User> {
    return of(createMockUsers().find(user => user.email === credentials.email));
  }

  updateUser(credentials: Credentials): Observable<User> {
    return of({ ...createMockUsers()[0], credentials });
  }

  resetPassword(email: string): Observable<{}> {
    return of(null);
  }

  signIn(credentials: Credentials): Observable<any> {
    return of(createMockUsers().find(user => user.email === credentials.email));
  }

  signOut(): Observable<User> {
    return of(null);
  }
}
