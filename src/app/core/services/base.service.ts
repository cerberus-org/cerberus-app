import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, QueryFn } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

@Injectable()
export abstract class BaseService<T extends { id: string }> {
  protected abstract collectionName: string;

  protected constructor(
    protected afs: AngularFirestore,
    protected errorService: ErrorService,
  ) {}

  getAllStateChanges(): Observable<Action> {
    return this.getStateChanges(this.collection());
  }

  getStateChangesByKey(key: string, value: string, opStr: WhereFilterOp = '=='): Observable<Action> {
    return this.getStateChanges(this.collection(ref => ref.where(key, opStr, value)));
  }

  /**
   * Gets the list of data from the collection.
   *
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  getAll(): Observable<T[]> {
    return this.getSnapshotChanges(this.collection());
  }

  /**
   * Gets the list of data from the collection, filtered by a key and value.
   *
   * @param key - the key to filter by
   * @param value - the value the key should be equal to
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  getByKey(key: string, value: string): Observable<T[]> {
    return this.getSnapshotChanges(this.collection(ref => ref.where(key, '==', value)));
  }

  /**
   * Gets a document's data from a collection by ID.
   *
   * @param id - the ID for the document.
   * @returns {Observable<T>} - an observable containing the data.
   */
  getById(id: string): Observable<T> {
    return from(
      this.collection().doc(id).ref.get()
        .then(snapshot => this.mapDocToObject({ ...snapshot.data(), id })),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Adds a new document to a collection.
   *
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
                snapshot => this.mapDocToObject({ id: snapshot.id, ...snapshot.data() }),
              ),
          ),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Non-destructively updates a document's data.
   *
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
   * Removes a document. Does not remove any nested collections.
   *
   * @param item - the item to be deleted
   * @returns {Observable<any>} - an empty Observable that emits when completed.
   */
  remove(item: T): Observable<any> {
    return from(
      this.collection().doc(item.id).delete(),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Returns the collection based on the collectionName, using a query function if provided.
   *
   * @param {QueryFn} queryFn - queries the collection
   * @returns {AngularFirestoreCollection<T>} - the collection
   */
  protected collection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(this.collectionName, queryFn);
  }

  protected mapChangeToObject(action: DocumentChangeAction<T>): T {
    return this.mapDocToObject({ id: action.payload.doc.id, ...action.payload.doc.data() as Object });
  }

  protected mapStateChangeToAction = map((action: DocumentChangeAction<T>) => ({
    type: `[${this.collectionName}] ${action.type}`,
    payload: this.mapChangeToObject(action),
  }));

  protected getStateChanges(collection: AngularFirestoreCollection<T>): Observable<Action> {
    return collection.stateChanges().pipe(
      mergeMap(actions => actions),
      this.mapStateChangeToAction,
    );
  }

  /**
   * Handles logic for retrieving an array of data from a given collection.
   *
   * @param {AngularFirestoreCollection<T extends {id: string}>} collection
   * @returns {Observable<T[]>} - the Observable of data as an array of objects
   */
  protected getSnapshotChanges(collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return collection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<T>[]) =>
        actions.map(action => this.mapChangeToObject(action))),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Override this function to perform conversions for documents received from the database.
   *
   * @param data
   * @returns {any}
   */
  protected mapDocToObject(data): T {
    return data;
  }

  /**
   * Override this function to perform conversions for objects to be sent as documents to the database.
   *
   * @param data
   * @return {any}
   */
  protected mapObjectToDoc(data): T {
    return data;
  }
}
