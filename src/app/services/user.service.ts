import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { empty, of } from 'rxjs';
import { Observable } from 'rxjs/index';
import { deepCopy } from '../functions';

import { getTestUsers, testUsers, User } from '../models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class UserService extends BaseService<User> {
  collectionName = 'users';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for users.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  private capitalizeUser(user: User): User {
    return Object.assign({}, user, {
      firstName: _.capitalize(user.firstName),
      lastName: _.capitalize(user.lastName),
    });
  }

  /**
   * Deletes the email and password properties and capitalizes the firstName and lastName of the
   * user going to the database.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  convertOut(user: User): User {
    const userClone = _.cloneDeep(user);
    delete userClone.password;
    delete userClone.email;
    return this.capitalizeUser(userClone);
  }

  /**
   * Capitalize the firstName and lastName of the user coming from the database.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  convertIn(user: User): User {
    return this.capitalizeUser(user);
  }
}

export class MockUserService extends UserService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<User[]> {
    return of(getTestUsers());
  }

  getByKey(key: string, value: string): Observable<User[]> {
    return of(getTestUsers().filter(user => user[key] === value));
  }

  getById(id: string): Observable<User> {
    return of(getTestUsers().find(user => user.id === id));
  }

  add(user: User): Observable<User> {
    return of(user);
  }

  update(user: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(user: any): Observable<any> {
    return empty();
  }
}
