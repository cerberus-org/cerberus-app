import { EMPTY, Observable, of } from 'rxjs';
import { TeamService } from '../../app/core/services/team.service';
import { Team } from '../../app/shared/models';
import { createMockTeams } from '../objects/team.mock';

export class MockTeamService extends TeamService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Team[]> {
    return of(createMockTeams());
  }

  getByKey(key: string, value: string): Observable<Team[]> {
    return of(createMockTeams().filter(team => team[key] === value));
  }

  getById(id: string): Observable<Team> {
    return of(createMockTeams().find(team => team.id === id));
  }

  add(team: Team): Observable<Team> {
    return of(team);
  }

  update(team: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(team: any): Observable<any> {
    return EMPTY;
  }
}
