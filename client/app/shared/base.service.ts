import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import handleError from './handle-error';

abstract class BaseService {
  abstract model: any;
  abstract modelName: string;

  constructor(protected http: Http) { }

  private get options() {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': localStorage.token });
    return new RequestOptions({ headers: headers });
  }

  getAll(): Observable<any[]> {
    return this.http.get(`/api/${this.modelName}s`)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  count(): Observable<number> {
    return this.http.get(`/api/${this.modelName}s/count`)
      .map(res => res.json())
      .catch(handleError);
  }

  create(obj: any): Observable<any> {
    return this.http.post(`/api/${this.modelName}`, JSON.stringify(obj), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  get(obj: any): Observable<any> {
    return this.http.get(`/api/${this.modelName}/${obj._id}`)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  update(obj: any): Observable<any> {
    return this.http.put(`/api/${this.modelName}/${obj._id}`, JSON.stringify(obj), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  delete(obj: any): Observable<any> {
    return this.http.delete(`/api/${this.modelName}/${obj._id}`, this.options)
      .map(res => res.json())
      .catch(handleError);
  }
}

export default BaseService
