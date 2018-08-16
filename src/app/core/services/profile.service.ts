import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { titleCase } from '../../shared/helpers';
import { Profile } from '../../shared/models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService<Profile> {
  collectionName = 'profiles';

  constructor(protected db: AngularFirestore, protected errorService: ErrorService) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for members.
   *
   * @param {Profile} profile - the profile to capitalize properties for
   * @returns {Profile} - a new profile with capitalized properties
   */
  private capitalizeProfile(profile: Profile): Profile {
    return {
      ...profile,
      name: titleCase(profile.name),
    };
  }

  /**
   * Deletes the email and password properties and capitalizes the name of the
   * profile going to the database.
   *
   * @param {Profile} profile - the profile to capitalize properties for
   * @returns {Profile} - a new profile with capitalized properties
   */
  mapObjectToDoc(profile: Profile): Profile {
    return this.capitalizeProfile(profile);
  }

  /**
   * Capitalize the name of the profile coming from the database.
   *
   * @param {Profile} profile - the profile to capitalize properties for
   * @returns {Profile} - a new profile with capitalized properties
   */
  mapDocToObject(profile: Profile): Profile {
    return this.capitalizeProfile(profile);
  }
}
