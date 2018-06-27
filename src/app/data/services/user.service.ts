import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { User } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

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
    return {
      ...user,
      firstName: _.capitalize(user.firstName),
      lastName: _.capitalize(user.lastName),
    };
  }

  /**
   * Deletes the email and password properties and capitalizes the firstName and lastName of the
   * user going to the database.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  mapObjectToDoc(user: User): User {
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
  mapDocToObject(user: User): User {
    return this.capitalizeUser(user);
  }
}
