import { Injectable } from '@angular/core';
import { titleCase } from '../../shared/helpers';
import { User } from '../../shared/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  collectionName = 'users';

  /**
   * Handles capitalization logic for members.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  private capitalizeUser(user: User): User {
    return {
      ...user,
      name: titleCase(user.name),
    };
  }

  /**
   * Deletes the email and password properties and capitalizes the name of the
   * user going to the database.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  mapObjectToDocument(user: User): User {
    return this.capitalizeUser(user);
  }

  /**
   * Capitalize the name of the user coming from the database.
   *
   * @param {User} user - the user to capitalize properties for
   * @returns {User} - a new user with capitalized properties
   */
  mapDocumentToObject(user: User): User {
    return this.capitalizeUser(user);
  }
}
