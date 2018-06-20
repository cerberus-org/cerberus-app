import { EMPTY, Observable, of } from 'rxjs';
import { UserService } from '../../data/services/user.service';
import { User } from '../../models';
import { getMockUsers } from '../objects/user.mock';

export class MockUserService extends UserService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<User[]> {
    return of(getMockUsers());
  }

  getByKey(key: string, value: string): Observable<User[]> {
    return of(getMockUsers().filter(user => user[key] === value));
  }

  getById(id: string): Observable<User> {
    return of(getMockUsers().find(user => user.id === id));
  }

  add(user: User): Observable<User> {
    return of(user);
  }

  update(user: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(user: any): Observable<any> {
    return EMPTY;
  }
}
