import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import ErrorService from './error.service';

abstract class BaseService {
  abstract model: any;
  abstract modelName: string;

  constructor(protected http: Http, protected errorService: ErrorService) { }

  get options() {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': localStorage.token });
    return new RequestOptions({ headers: headers });
  }

  getAll(): Observable<any[]> {
    return this.http.get(`/api/${this.modelName}s`, this.options)
      .map(res => res.json().map(this.convert))
      .catch(this.errorService.handleHttpError);
  }

  count(): Observable<number> {
    return this.http.get(`/api/${this.modelName}s/count`, this.options)
      .map(res => res.json())
      .catch(this.errorService.handleHttpError);
  }

  create(obj: any): Observable<any> {
    return this.http.post(`/api/${this.modelName}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .catch(this.errorService.handleHttpError);
  }

  get(obj: any): Observable<any> {
    return this.http.get(`/api/${this.modelName}/${obj._id}`, this.options)
      .map(res => this.convert(res.json()))
      .catch(this.errorService.handleHttpError);
  }

  update(obj: any): Observable<any> {
    return this.http.put(`/api/${this.modelName}/${obj._id}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .catch(this.errorService.handleHttpError);
  }

  delete(obj: any): Observable<any> {
    return this.http.delete(`/api/${this.modelName}/${obj._id}`, this.options)
      .map(res => this.convert(res.json()))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Override this function to perform custom conversions to the data, e.g., converting date strings into Date objects (see VisitService).
   * @param data
   * @returns {any}
   */
  convert(data: any) {
    return data;
  }
}

export default BaseService
