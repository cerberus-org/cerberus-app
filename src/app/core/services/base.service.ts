import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, QueryFn } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getItemWithoutArrayProperties } from '../../shared/helpers';
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
  protected getDocsFromCollection(snapshot: boolean, collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return (
      snapshot
        ? collection.snapshotChanges().pipe(
        map((actions: DocumentChangeAction<T>[]) => (
          actions.map((action: DocumentChangeAction<T>) => {
            const data = action.payload.doc.data() as T;
            const id = action.payload.doc.id;
            return this.mapDocToObject(Object.assign(data, { id }));
          })
        )))
        : collection.valueChanges().pipe(
        map((items: T[]) => items.map((item: T) => this.mapDocToObject(item))))
    ).pipe(
      catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Gets the list of data from the collection.
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  getAll(snapshot?: boolean): Observable<T[]> {
    return this.getDocsFromCollection(snapshot, this.collection());
  }

  /**
   * Gets the list of data from the collection, filtered by a key and value.
   * @param key - the key to filter by
   * @param value - the value the key should be equal to
   * @param snapshot - use true if you need a list of data with the metadata (includes document IDs)
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  getByKey(key: string, value: string, snapshot: boolean = false): Observable<T[]> {
    return this.getDocsFromCollection(
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
    return from(
      this.collection().doc(id).ref.get()
        .then(snapshot => this.mapDocToObject(snapshot.data())),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Adds a new document to a collection.
   * @param item - the item to be added
   * @param id - specify an ID, otherwise an auto-generated ID will be used
   * @returns {Observable<T>} - the Observable of the snapshot of the added object
   */
  add(item: T, id?: string): Observable<T> {
    return from(
      id
        ? this.collection().doc(id).set(this.mapObjectToDoc(item))
          .then(() => this.mapDocToObject(Object.assign({}, item, { id })))
        : this.collection().add(Object.assign({}, this.mapObjectToDoc(item)))
          .then(
            ref => ref.get()
              .then(
                snapshot => this.mapDocToObject(Object.assign({}, snapshot.data(), { id: snapshot.id }))),
          ),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Non-destructively updates a document's data.
   * @param item - the item to be updated
   * @returns {Observable<any>} - an empty Observable that emits when completed.
   */
  update(item: T): Observable<any> {
    return from(
      this.collection().doc(item.id).update(this.mapObjectToDoc(item)),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Performs a batch update for items passed in.
   *
   * @param {T[]} items - updated items
   * @returns {Observable<any>}
   */
  batchUpdate(items: T[]): Observable<any> {
    const batch = this.db.firestore.batch();
    items.forEach((item) => {
      batch.update(this.db.firestore.collection(this.collectionName).doc(item.id), getItemWithoutArrayProperties(item));
    });
    return from(
      batch.commit(),
    )
      .pipe(
        catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Deletes an entire document. Does not delete any nested collections.
   * @param item - the item to be deleted
   * @returns {Observable<any>} - an empty Observable that emits when completed.
   */
  delete(item: T): Observable<any> {
    return from(
      this.collection().doc(item.id).delete(),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Override this function to perform conversions for documents received from the database.
   * @param data
   * @returns {any}
   */
  protected mapDocToObject(data) {
    return data;
  }

  /**
   * Override this function to perform conversions for objects to be sent as documents to the database.
   * @param data
   * @return {any}
   */
  protected mapObjectToDoc(data) {
    return data;
  }
}
