import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class UserService extends BaseService {
  model: any;
  modelName: 'user';

  constructor(protected http: Http, public errorService: ErrorService) {
    super(http, errorService);
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

  login(): Observable<any> {
    return Observable.of({token: 'token'});
  }
}

