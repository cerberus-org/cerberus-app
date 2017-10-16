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

  count(): Observable<number> {
    return Observable.of(testUsers.length);
  }

  create(obj: User): Observable<User> {
    return Observable.of(testUsers[0]);
  }

  getById(id: string): Observable<User> {
    return Observable.of(testUsers[0]);
  }

  update(obj: User): Observable<User> {
    return Observable.of(testUsers[0]);
  }

  delete(obj: User): Observable<User> {
    return Observable.of(testUsers[0]);
  }

  login(): Observable<any> {
    return Observable.of({ token: 'token' });
  }
}
