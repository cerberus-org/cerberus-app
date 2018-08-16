import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  QueryFn,
} from 'angularfire2/firestore';
import { Action as FirestoreAction, DocumentSnapshot } from 'angularfire2/firestore/interfaces';
import { from, merge, Observable } from 'rxjs';
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

  getAllChanges(): Observable<Action> {
    return this.getCollectionChanges(this.collection());
  }

  getChangesByKey(key: string, value: string, opStr: WhereFilterOp = '=='): Observable<Action> {
    return this.getCollectionChanges(this.collection(ref => ref.where(key, opStr, value)));
  }

  getChangesById(id: string): Observable<Action> {
    return this.getDocumentChanges(this.collection().doc<T>(id));
  }

  getChangesByIds(ids: string[]): Observable<Action> {
    return merge(...ids.map(id => this.getChangesById(id)));
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
        .then(snapshot => this.mapDocumentToObject({ ...snapshot.data(), id })),
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
        ? this.collection().doc(id).set(this.mapObjectToDocument(item))
          .then(() => this.mapDocumentToObject(Object.assign({}, item, { id })))
        : this.collection().add(Object.assign({}, this.mapObjectToDocument(item)))
          .then(
            ref => ref.get()
              .then(
                snapshot => this.mapDocumentToObject({ id: snapshot.id, ...snapshot.data() }),
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
      this.collection().doc(item.id).update(this.mapObjectToDocument(item)),
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

  protected mapCollectionChangeToObject(action: DocumentChangeAction<T>): T {
    return this.mapDocumentToObject({
      id: action.payload.doc.id,
      ...action.payload.doc.data() as Object,
    });
  }

  protected mapCollectionChangeToAction = map((action: DocumentChangeAction<T>) => ({
    type: `[${this.collectionName}] ${action.type}`,
    payload: this.mapCollectionChangeToObject(action),
  }));

  protected getCollectionChanges(collection: AngularFirestoreCollection<T>): Observable<Action> {
    return collection.stateChanges().pipe(
      mergeMap(actions => actions),
      this.mapCollectionChangeToAction,
    );
  }

  protected mapDocumentChangeToAction = map((action: FirestoreAction<DocumentSnapshot<T>>) => {
    console.log(action.payload);
    return ({
      type: `[${this.collectionName}] added`,
      payload: {
        id: action.payload.id,
        ...action.payload.data() as Object,
      },
    });
  });

  protected getDocumentChanges(doc: AngularFirestoreDocument<T>): Observable<Action> {
    return doc.snapshotChanges().pipe(this.mapDocumentChangeToAction);
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
        actions.map(action => this.mapCollectionChangeToObject(action))),
    )
      .pipe(catchError(error => this.errorService.handleFirebaseError(error)));
  }

  /**
   * Override this function to perform conversions for documents received from the database.
   *
   * @param data
   * @returns {any}
   */
  protected mapDocumentToObject(data): T {
    return data;
  }

  /**
   * Override this function to perform conversions for objects to be sent as documents to the database.
   *
   * @param data
   * @return {any}
   */
  protected mapObjectToDocument(data): T {
    return data;
  }
}
