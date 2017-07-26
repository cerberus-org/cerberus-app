import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import handleError from '../helpers/handle-error';
import BaseService from './base.service';

@Injectable()
export class UserService extends BaseService {
  model: any;
  modelName: 'user';

  constructor(protected http: Http) {
    super(http);
  }

  login(user): Observable<any> {
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

