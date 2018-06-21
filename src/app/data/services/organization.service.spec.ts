import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../mock/classes/error.service.mock';
import { mockOrganizations } from '../../mock/objects/organization.mock';
import { Organization } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let organization: Organization;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(OrganizationService);
    organization = Object.assign({}, mockOrganizations[0]);
    organization.name = 'jefferson sPCA';
    organization.description = 'the Jefferson SPCA exists to support the Jefferson Parish Animal Shelter.';
  }));

  it('should be created', inject([OrganizationService], (organizationService: OrganizationService) => {
    expect(organizationService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.mapDocToObject(organization);
    expect(converted).toEqual(mockOrganizations[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDoc(organization);
    expect(converted).toEqual(mockOrganizations[0]);
  });
});
