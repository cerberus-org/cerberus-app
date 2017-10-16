import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testUsers, User } from '../models/user';
import * as UsersActions from '../actions/users.actions'

@Injectable()
export class UserService extends BaseService {
  model = User;

  constructor(protected http: Http,
              protected store: Store<User[]>,
              protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'user';
    this.actions = {
      load: UsersActions.Load,
      add: UsersActions.Add,
      modify: UsersActions.Modify
    };
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
    super(null, null, null);
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
