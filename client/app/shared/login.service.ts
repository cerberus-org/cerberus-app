import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import handleError from './handle-error';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class LoginService {

  constructor(private http: AuthHttp) { }

  login(user): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/login', user, options)
      .map((res: Response) => res.json())
      .catch(handleError);
  }
}
