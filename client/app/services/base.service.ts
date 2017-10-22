import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ErrorService } from './error.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

abstract class BaseService<T> {
  protected modelName: string;
  private collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore,
              protected http: Http,
              protected errorService: ErrorService) {
    this.collection = db.collection<T>(`${this.modelName}s`);
  }

  get options() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
      'Authorization': localStorage.token
    });
    return new RequestOptions({ headers: headers });
  }

  getAll(): Observable<T[]> {
    return this.collection.valueChanges()
      .catch(this.errorService.handleHttpError);
  }

  getAllSnapshots(): Observable<T[]> {
    return this.collection.snapshotChanges()
      .catch(this.errorService.handleHttpError);
  }

  getByKey(key: string, value: string): Observable<T[]> {
    return this.db.collection<T>(`${this.modelName}s`, ref => ref
      .where(key, '==', value)).valueChanges();
  }

  getSnapshotsByKey(key: string, value: string): Observable<T[]> {
    return this.db.collection<T>(`${this.modelName}s`, ref => ref
      .where(key, '==', value)).snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          return Object.assign(data, id);
        });
      });
  }

  add(item: any): void {
    this.collection.add(item)
      .catch(this.errorService.handleHttpError);
  }

  update(item: any): void {
    this.db.doc<T>(`${this.modelName}s/${item.id}`).update(item)
      .catch(this.errorService.handleHttpError);
  }

  delete(item: any): void {
    this.db.doc<T>(`${this.modelName}s/${item.id}`).delete()
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Override this function to perform custom conversions for http responses.
   * @param data
   * @returns {any}
   */
  convertIn(data: any) {
    return data;
  }

  /**
   * Override this funciton to perform custom converstions prior to http post, delete and put requests.
   * @param data
   * @return {any}
   */
  convertOut(data: any) {
    return data;
  }
}

export default BaseService
