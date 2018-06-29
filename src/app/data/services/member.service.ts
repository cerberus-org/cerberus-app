import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { Member } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

@Injectable()
export class MemberService extends BaseService<Member> {
  collectionName = 'members';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for members.
   *
   * @param {Member} user - the validMember to capitalize properties for
   * @returns {Member} - a new validMember with capitalized properties
   */
  private capitalizeUser(user: Member): Member {
    return {
      ...user,
      firstName: _.capitalize(user.firstName),
      lastName: _.capitalize(user.lastName),
    };
  }

  /**
   * Deletes the email and password properties and capitalizes the firstName and lastName of the
   * validMember going to the database.
   *
   * @param {Member} user - the validMember to capitalize properties for
   * @returns {Member} - a new validMember with capitalized properties
   */
  mapObjectToDoc(user: Member): Member {
    const userClone = _.cloneDeep(user);
    delete userClone.password;
    delete userClone.email;
    return this.capitalizeUser(userClone);
  }

  /**
   * Capitalize the firstName and lastName of the validMember coming from the database.
   *
   * @param {Member} user - the validMember to capitalize properties for
   * @returns {Member} - a new validMember with capitalized properties
   */
  mapDocToObject(user: Member): Member {
    return this.capitalizeUser(user);
  }
}
