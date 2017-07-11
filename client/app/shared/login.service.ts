import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import handleError from './handle-error';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(user): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/login', user)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.clear();
  }
}
