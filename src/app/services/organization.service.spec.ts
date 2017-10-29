import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { OrganizationService } from './organization.service';
import { ErrorService, MockErrorService } from './error.service';
import { Organization, testOrganizations } from '../models/organization';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let organization: Organization;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationService,
        { provide: ErrorService, useClass: MockErrorService },
        { provide: AngularFirestore, useValue: null }
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(OrganizationService);
    organization = Object.assign({}, testOrganizations[0]);
    organization.name = 'jefferson sPCA animal shelter';
    organization.description = '2701 lapalco blvd, harvey, lA 70058.';
  }));

  it('is created', inject([OrganizationService], (organizationService: OrganizationService) => {
    expect(organizationService).toBeTruthy();
  }));

  it('converts data going to the database', () => {
    const converted = service.convertIn(organization);
    expect(converted).toEqual(testOrganizations[0]);
  });

  it('converts coming from the database', () => {
    const converted = service.convertOut(organization);
    expect(converted).toEqual(testOrganizations[0]);
  });
});
