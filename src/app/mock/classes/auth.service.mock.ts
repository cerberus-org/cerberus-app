import { User as FirebaseUser } from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models';
import { getMockFirebaseUsers } from '../objects/user.mock';

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null);
  }

  createUser(user: User): Observable<User> {
    return of(user);
  }

  updateUser(user: User): Observable<User> {
    return of(user);
  }

  resetPassword(email: string): Observable<{}> {
    return of(null);
  }

  signIn(email: string, password: string): Observable<any> {
    return of(getMockFirebaseUsers().find(user => user.email === email));
  }

  signOut(): Observable<FirebaseUser> {
    return of(null);
  }
}
