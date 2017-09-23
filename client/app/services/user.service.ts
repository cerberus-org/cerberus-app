import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { testUsers, User } from '../models/user';
import { ErrorService } from './error.service';

@Injectable()
export class UserService extends BaseService {
  model: User;

  constructor(protected http: Http, protected errorService: ErrorService) {
    super(http, null, errorService);
    this.modelName = 'user';
  }

  login(user): Observable<any> {
    user.email = user.email.toLowerCase();
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/login', user)
      .map((res: Response) => res.json())
      .catch(this.errorService.handleHttpError);
  }
}

export class MockUserService extends UserService {

  constructor() {
    super(null, null);
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
