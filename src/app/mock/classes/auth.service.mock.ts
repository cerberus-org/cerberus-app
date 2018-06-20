import { User as FirebaseUser } from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models';
import { mockFirebaseUsers } from '../objects/user.mock';

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

  signIn(email: string, password: string): Observable<any> {
    return of(mockFirebaseUsers[0]);
  }

  signOut(): Observable<FirebaseUser> {
    return of(null);
  }
}
