import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { upperAllFirst } from '../../shared/helpers';
import { Team } from '../../shared/models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService extends BaseService<Team> {
  collectionName = 'teams';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for teams.
   *
   * @param {Team} team - the team to capitalize properties for
   * @returns {Team} - a new team with capitalized properties
   */
  private capitalizeTeam(team: Team): Team {
    team.name = upperAllFirst(team.name);
    team.description = _.upperFirst(team.description);
    return team;
  }

  /**
   * Capitalize the name and description of the team going to the database.
   *
   * @param {Team} team - the team to capitalize properties for
   * @returns {Team} - a new team with capitalized properties
   */
  mapObjectToDoc(team: Team): Team {
    return this.capitalizeTeam(team);
  }

  /**
   * Capitalize the name and description of the team coming from the database.
   *
   * @param {Team} team - the team to capitalize properties for
   * @returns {Team} - a new team with capitalized properties
   */
  mapDocToObject(team: Team): Team {
    return this.capitalizeTeam(team);
  }
}
