import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  QueryFn,
} from 'angularfire2/firestore';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ErrorService } from './error.service';

@Injectable()
export abstract class BaseService<T extends { id: string }> {
  protected abstract collectionName: string;

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
  }

  /**
   * Returns the collection based on the collectionName, using a query function if provided.
   * @param {QueryFn} queryFn - queries the collection
   * @returns {AngularFirestoreCollection<T>} - the collection
   */
  protected collection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return this.db ? this.db.collection<T>(this.collectionName, queryFn) : undefined;
  }

  /**
   * Handles logic for retrieving an array of data from a given collection.
   * @param {boolean} snapshot - use true to get objects with IDs
   * @param {AngularFirestoreCollection<T extends {id: string}>} collection
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  protected getDataFromCollection(
    snapshot: boolean,
    collection: AngularFirestoreCollection<T>,
  ): Observable<T[]> {
    return (
      snapshot
        ? collection.snapshotChanges()
          .map((actions: DocumentChangeAction[]) => (
            actions.map((action: DocumentChangeAction) => {
              const data = action.payload.doc.data() as T;
              const id = action.payload.doc.id;
              return this.convertIn(Object.assign(data, { id }));
            })
          ))
        : collection.valueChanges()
          .map((items: T[]) => items.map((item: T) => this.convertIn(item)))
    )
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * Gets the list of data from the collection.
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  getAll(snapshot?: boolean): Observable<T[]> {
    return this.getDataFromCollection(snapshot, this.collection());
  }

  /**
   * Gets the list of data from the collection, filtered by a key and value.
   * @param key - the key to filter by
   * @param value - the value the key should be equal to
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  getByKey(key: string, value: string, snapshot?: boolean): Observable<T[]> {
    return this.getDataFromCollection(
      snapshot,
      this.collection(ref => ref.where(key, '==', value)),
    );
  }

  /**
   * Gets a document's data from a collection by ID.
   * @param id - the ID for the document.
   * @returns {Observable<T>} - an observable containing the data.
   */
  getById(id: string): Observable<T> {
    return Observable.fromPromise(
      this.collection().doc(id).ref.get()
        .then(snapshot => this.convertIn(snapshot.data())),
    )
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * Adds a new document to a collection.
   * @param item - the item to be added
   * @param id - specify an ID, otherwise an auto-generated ID will be used
   * @returns {Observable<T>} - the Observable of the snapshot of the added object
   */
  add(item: T, id?: string): Observable<T> {
    return Observable.fromPromise(
      id
        ? this.collection().doc(id)
          .set(this.convertOut(item))
          .then(() => this.convertIn(Object.assign({}, item, { id })))
        : this.collection().add(Object.assign({}, this.convertOut(item)))
          .then(
            ref => ref.get()
              .then(
                snapshot => this.convertIn(Object.assign({}, snapshot.data(), { id: snapshot.id }))),
          ),
    )
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * Non-destructively updates a document's data.
   * @param item - the item to be updated
   * @returns {Observable<any>} - an empty Observable that emits when completed.
   */
  update(item: T): Observable<any> {
    return Observable.fromPromise(
      this.collection().doc(item.id).update(this.convertOut(item)),
    )
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * Deletes an entire document. Does not delete any nested collections.
   * @param item - the item to be deleted
   * @returns {Observable<any>} - an empty Observable that emits when completed.
   */
  delete(item: T): Observable<any> {
    return Observable.fromPromise(
      this.collection().doc(item.id).delete(),
    )
      .catch(error => this.errorService.handleFirebaseError(error));
  }

  /**
   * Override this function to perform conversions for data received from the database.
   * @param data
   * @returns {any}
   */
  protected convertIn(data) {
    return data;
  }

  /**
   * Override this function to perform conversions for data to be sent to the database.
   * @param data
   * @return {any}
   */
  protected convertOut(data) {
    return data;
  }
}
