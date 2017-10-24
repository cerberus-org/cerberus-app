import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { ErrorService } from './error.service';

abstract class BaseService<T> {
  private collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService,
              protected collectionName: string) {
    this.collection = db.collection<T>(collectionName);
  }

  /**
   * Gets the list of data from the collection.
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<R|T>} - the Observable of data as an array of objects
   */
  getAll(snapshot?: boolean): Observable<T[]> {
    return snapshot
      ? this.collection.snapshotChanges()
        .catch(this.errorService.handleHttpError)
      : this.collection.valueChanges()
        .catch(this.errorService.handleHttpError);
  }

  /**
   * Gets the list of data from the collection, filtered by a key and value.
   * @param key - the key to filter by
   * @param value - the value the key should be equal to
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<R|T>} - the Observable of data as an array of objects
   */
  getByKey(key: string, value: string, snapshot?: boolean): Observable<T[]> {
    const collection = this.db.collection<T>(this.collectionName, ref => ref
      .where(key, '==', value));
    return snapshot
      ? collection.snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as T;
            const id = a.payload.doc.id;
            return Object.assign(data, { id });
          });
        })
        .catch(this.errorService.handleHttpError)
      : collection.valueChanges()
        .catch(this.errorService.handleHttpError);
  }

  /**
   * Gets a document's data from a collection by ID.
   * @param id - the ID for the document.
   * @returns {any} - an observable containing the data.
   */
  getById(id: string): Observable<T> {
    return Observable.fromPromise(this.collection.doc(id).ref.get()
      .then(snapshot => snapshot.data()))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Adds a new document to a collection.
   * @param item - the item to be added
   * @returns {Observable<R|T>} - the Observable of the snapshot of the added object
   */
  add(item: any): Observable<T> {
    return Observable.fromPromise(this.collection.add(item)
      .then(ref => ref.get()
        .then(snapshot => snapshot.data())))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Non-destructively updates a document's data.
   * @param item - the item to be updated
   * @returns {Observable<R|T>} - an empty Observable that emits when completed.
   */
  update(item: any): Observable<any> {
    return Observable.fromPromise(this.collection.doc(item.id).update(item))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Deletes an entire document. Does not delete any nested collections.
   * @param item - the item to be deleted
   * @returns {Observable<R|T>} - an empty Observable that emits when completed.
   */
  delete(item: any): Observable<any> {
    return Observable.fromPromise(this.collection.doc(item.id).delete())
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
   * Override this function to perform custom converstions prior to http post, delete and put requests.
   * @param data
   * @return {any}
   */
  convertOut(data: any) {
    return data;
  }
}

export default BaseService
