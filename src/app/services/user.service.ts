import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import * as _ from 'lodash';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testUsers, User } from '../models/user';

@Injectable()
export class UserService extends BaseService<User> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService, 'users');
  }

  /**
   * Capitalize the firstName and lastName of the user going to the database.
   * @param user
   * @returns {any}
   */
  convertOut(user: User): User {
    return this.capitalize(user);
  }

  /**
   * Capitalize the firstName and lastName of the user coming from the database.
   * @param user
   * @returns {any}
   */
  convertIn(user: User): User {
    return this.capitalize(user);
  }

  /**
   * Handles capitalization logic for users.
   * @param user
   * @returns {any}
   */
  private capitalize(user: User): User {
    user.firstName = _.capitalize(user.firstName);
    user.lastName = _.capitalize(user.lastName);
    return user
  }
}

export class MockUserService extends UserService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<User[]> {
    return Observable.of(testUsers);
  }

  getByKey(key: string, value: string): Observable<User[]> {
    return Observable.of(testUsers
      .filter(user => user[key] === value));
  }

  getById(id: string): Observable<User> {
    return Observable.of(testUsers
      .find(user => user.id === id));
  }

  add(user: User): Observable<User> {
    return Observable.of(user);
  }

  update(user: any): Observable<any> {
    return Observable.empty<any>();
  }

  delete(user: any): Observable<any> {
    return Observable.empty<any>();
  }
}
