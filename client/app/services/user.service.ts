import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testUsers, User } from '../models/user';

@Injectable()
export class UserService extends BaseService<User> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService, 'users');
  }
}

export class MockUserService extends UserService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<User[]> {
    return Observable.of(testUsers);
  }

  getById(id: string): Observable<User> {
    return Observable.of(testUsers
      .find(user => user.id === id));
  }

  count(): Observable<number> {
    return Observable.of(testUsers.length);
  }

  create(user: User): Observable<User> {
    return Observable.of(user);
  }

  update(user: User): Observable<void> {
    return Observable.empty<void>();
  }

  delete(user: User): Observable<void> {
    return Observable.empty<void>();
  }

  login(user: User): Observable<any> {
    return Observable.of({ user, token: 'token' });
  }
}
