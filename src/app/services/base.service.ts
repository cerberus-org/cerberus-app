import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ErrorService } from './error.service';

export abstract class BaseService<T> {
  private collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService,
              protected collectionName: string) {
    if (db) {
      this.collection = db.collection<T>(collectionName);
    }
  }

  /**
   * Gets the list of data from the collection.
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<R|T>} - the Observable of data as an array of objects
   */
  getAll(snapshot?: boolean): Observable<T[]> {
    return snapshot
      ? this.collection.snapshotChanges()
        .map(item => this.convertIn(item))
        .catch(this.errorService.handleHttpError)
      : this.collection.valueChanges()
        .map(item => this.convertIn(item))
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
            return this.convertIn(Object.assign(data, { id }));
          });
        })
        .catch(this.errorService.handleHttpError)
      : collection.valueChanges()
        .map(item => this.convertIn(item))
        .catch(this.errorService.handleHttpError);
  }

  /**
   * Gets a document's data from a collection by ID.
   * @param id - the ID for the document.
   * @returns {any} - an observable containing the data.
   */
  getById(id: string): Observable<T> {
    return Observable.fromPromise(this.collection.doc(id).ref.get()
      .then(snapshot => this.convertIn(snapshot.data())))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Adds a new document to a collection.
   * @param item - the item to be added
   * @param id - specify an ID, otherwise an auto-generated ID will be used
   * @returns {Observable<R|T>} - the Observable of the snapshot of the added object
   */
  add(item: T, id?: string): Observable<T> {
    return id
      ? Observable.fromPromise(this.collection.doc(id).set(Object.assign({}, this.convertOut(item)))
        .then(() => this.convertIn(Object.assign({}, item, { id }))))
        .catch(this.errorService.handleHttpError)
      : Observable.fromPromise(this.collection.add(Object.assign({}, this.convertOut(item)))
        .then(ref => ref.get()
          .then(snapshot => {
            const data = snapshot.data();
            const snapshotId = snapshot.id;
            return this.convertIn(Object.assign(data, { snapshotId }))
          })))
        .catch(this.errorService.handleHttpError);
  }

  /**
   * Non-destructively updates a document's data.
   * @param item - the item to be updated
   * @returns {Observable<R|T>} - an empty Observable that emits when completed.
   */
  update(item: any): Observable<any> {
    return Observable.fromPromise(this.collection.doc(item.id).update(this.convertOut(item)))
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
   * Override this function to perform conversions for data received from the database.
   * @param data
   * @returns {any}
   */
  convertIn(data) {
    return data;
  }

  /**
   * Override this function to perform conversions for data to be sent to the database.
   * @param data
   * @return {any}
   */
  convertOut(data) {
    return data;
  }
}
