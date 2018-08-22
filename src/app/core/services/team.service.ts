import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { upperAllFirst } from '../../shared/helpers';
import { Team } from '../../shared/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService extends BaseService<Team> {
  collectionName = 'teams';

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
  mapObjectToDocument(team: Team): Team {
    return this.capitalizeTeam(team);
  }

  /**
   * Capitalize the name and description of the team coming from the database.
   *
   * @param {Team} team - the team to capitalize properties for
   * @returns {Team} - a new team with capitalized properties
   */
  mapDocumentToObject(team: Team): Team {
    return this.capitalizeTeam(team);
  }
}
