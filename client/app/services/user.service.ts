import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';

import BaseService from './base.service';
import { testUsers, User } from '../models/user';
import { ErrorService } from './error.service';
import { ADD_USER, LOAD_USERS, MODIFY_USER } from '../reducers/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends BaseService {
  model = User;

  constructor(protected http: Http,
              protected store: Store<User[]>,
              protected errorService: ErrorService,
              private router: Router) {
    super(http, store, errorService);
    this.modelName = 'user';
    this.actionTypes = {
      load: LOAD_USERS,
      add: ADD_USER,
      modify: MODIFY_USER
    }
  }

  setLocalStorageItems(user: User, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('organizationId', user.organizationId);
    localStorage.setItem('userName', user.firstName);
  }

  login(user: User, successCb): void {
    user.email = user.email.toLowerCase();
    this.http.post('/api/user/login', JSON.stringify(user), this.options)
      // Save user data and token to local storage
      .map(res => { this.convertIn(res.json()), this.setLocalStorageItems(res.json().user, res.json().token) })
      .map(payload => ({ type: this.actionTypes.add, payload: payload }))
      .subscribe(action => {
        // Route user to dashboard if login is successful.
        this.store.dispatch(action), this.router.navigateByUrl('/dashboard') },
        err => this.errorService.handleHttpError(err), successCb);
  }
}

export class MockUserService extends UserService {

  constructor() {
    super(null, null, null, null);
  }

  getAllRx(): void { }

  getByIdRx(id: string): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getAll(): Observable<User[]> {
    return Observable.of(testUsers);
  }

  count(): Observable<number> {
    return Observable.of(testUsers.length);
  }

  create(obj: User): Observable<User> {
    return Observable.of(testUsers[0]);
  }

  get (obj: User): Observable<User> {
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
