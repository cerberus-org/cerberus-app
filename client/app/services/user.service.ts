import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { testUsers, User } from '../models/user';
import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class UserService extends BaseService {
  model = User;

  constructor(protected http: Http,
              protected errorService: ErrorService) {
    super(http, errorService);
    this.modelName = 'user';
  }

  login(user: User): Observable<any> {
    user.email = user.email.toLowerCase();
    return this.http.post('/api/user/login', JSON.stringify(user), this.options)
      .map(res => this.convertIn(res.json()))
      .catch(this.errorService.handleHttpError);
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
