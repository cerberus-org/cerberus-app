import { EMPTY, Observable, of } from 'rxjs/index';
import { UserService } from '../../app/core/services/user.service';
import { User } from '../../app/shared/models';
import { createMockUsers } from '../objects/user.mock';

export class MockUserService extends UserService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<User[]> {
    return of(createMockUsers());
  }

  getByKey(key: string, value: string): Observable<User[]> {
    return of(createMockUsers().filter(user => user[key] === value));
  }

  getById(id: string): Observable<User> {
    return of(createMockUsers().find(user => user.id === id));
  }

  add(user: User): Observable<User> {
    return of(user);
  }

  update(user: any): Observable<any> {
    return of(Promise.resolve());
  }

  remove(user: any): Observable<any> {
    return EMPTY;
  }
}
