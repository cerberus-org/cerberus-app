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
   * @param {Member} member - the member to capitalize properties for
   * @returns {Member} - a new member with capitalized properties
   */
  private capitalizeMember(member: Member): Member {
    return {
      ...member,
      firstName: _.capitalize(member.firstName),
      lastName: _.capitalize(member.lastName),
    };
  }

  /**
   * Deletes the email and password properties and capitalizes the firstName and lastName of the
   * member going to the database.
   *
   * @param {Member} member - the validMember to capitalize properties for
   * @returns {Member} - a new validMember with capitalized properties
   */
  mapObjectToDoc(member: Member): Member {
    return this.capitalizeMember(member);
  }

  /**
   * Capitalize the firstName and lastName of the member coming from the database.
   *
   * @param {Member} member - the member to capitalize properties for
   * @returns {Member} - a new member with capitalized properties
   */
  mapDocToObject(member: Member): Member {
    return this.capitalizeMember(member);
  }
}
