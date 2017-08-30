import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import handleError from '../helpers/handle-error';
import BaseService from './base.service';
import { User } from '../models/user';

@Injectable()
export class UserService extends BaseService {
  model: User;
  modelName: 'user';

  constructor(protected http: Http) {
    super(http);
  }

  login(user): Observable<any> {
    user.email = user.email.toLowerCase();
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/login', user)
      .map((res: Response) => res.json())
      .catch(handleError);
  }
}

export class MockUserService extends UserService {

  constructor() {
    super(null);
  }

  login(): Observable<any> {
    return Observable.of({token: 'token'});
  }
}

