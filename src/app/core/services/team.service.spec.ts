import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../../mocks/classes/error.service.mock';
import { createMockTeams } from '../../../mocks/objects/team.mock';
import { Team } from '../../shared/models';
import { ErrorService } from './error.service';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  let team: Team;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(TeamService);
    team = createMockTeams()[0];
    team.name = 'jefferson sPCA';
    team.description = 'the Jefferson SPCA exists to support the Jefferson Parish Animal Shelter.';
  }));

  it('should be created', inject([TeamService], (teamService: TeamService) => {
    expect(teamService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.mapDocumentToObject(team);
    expect(converted).toEqual(createMockTeams()[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDocument(team);
    expect(converted).toEqual(createMockTeams()[0]);
  });
});
