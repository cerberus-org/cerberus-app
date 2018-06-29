import { User as FirebaseUser } from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Member } from '../../models';
import { createMockUsers } from '../objects/member.mock';

export class MockAuthService extends AuthService {

  constructor() {
    super(null, null, null, null);
  }

  createUser(user: Member): Observable<Member> {
    return of(user);
  }

  updateUser(user: Member): Observable<Member> {
    return of(user);
  }

  resetPassword(email: string): Observable<{}> {
    return of(null);
  }

  signIn(email: string, password: string): Observable<any> {
    return of(createMockUsers().find(user => user.email === email));
  }

  signOut(): Observable<FirebaseUser> {
    return of(null);
  }
}
