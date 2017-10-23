import { Headers, RequestOptions } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ErrorService } from './error.service';
import 'rxjs/add/observable/fromPromise';

abstract class BaseService<T> {
  protected model: string;
  private collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    this.collection = db.collection<T>(`${this.model}s`);
  }

  get options() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
      'Authorization': localStorage.token
    });
    return new RequestOptions({ headers: headers });
  }

  getAll(snapshot?: boolean): Observable<T[]> {
    return snapshot
      ? this.collection.snapshotChanges()
        .catch(this.errorService.handleHttpError)
      : this.collection.valueChanges()
        .catch(this.errorService.handleHttpError);
  }

  getByKey(key: string, value: string, snapshot?: boolean): Observable<T[]> {
    const collection = this.db.collection<T>(`${this.model}s`, ref => ref
      .where(key, '==', value));
    return snapshot
      ? collection.snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as T;
            const id = a.payload.doc.id;
            return Object.assign(data, id);
          });
        })
      : collection.valueChanges()
        .catch(this.errorService.handleHttpError);
  }

  add(item: any): Observable<T> {
    return Observable.fromPromise(this.collection.add(item)
      .then(ref => ref.get()
        .then(snapshot => snapshot.data())))
      .catch(this.errorService.handleHttpError);
  }

  update(item: any): Observable<void> {
    return Observable.fromPromise(this.db.doc<T>(`${this.model}s/${item.id}`).update(item))
      .catch(this.errorService.handleHttpError);
  }

  delete(item: any): Observable<void> {
    return Observable.fromPromise(this.db.doc<T>(`${this.model}s/${item.id}`).delete())
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
