import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testUsers, User } from '../models/user';

@Injectable()
export class UserService extends BaseService<User> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService);
    this.model = 'user';
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
      .find(user => user._id === id));
  }

  count(): Observable<number> {
    return Observable.of(testUsers.length);
  }

  create(user: User): Observable<User> {
    return Observable.of(user);
  }

  update(user: User): Observable<User> {
    return Observable.of(user);
  }

  delete(user: User): Observable<User> {
    return Observable.of(user);
  }

  login(user: User): Observable<any> {
    return Observable.of({ user, token: 'token' });
  }
}
