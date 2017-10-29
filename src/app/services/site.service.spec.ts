import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { SiteService } from './site.service';
import { ErrorService, MockErrorService } from './error.service';
import { testSites } from '../models/site';

describe('SiteService', () => {
  let backend: MockBackend = null;
  let service: SiteService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        SiteService,
        { provide: ErrorService, useClass: MockErrorService }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(SiteService);
    site = Object.assign({}, testSites[0]);
    site.name = 'jefferson sPCA';
    site.address = 'the Jefferson SPCA exists to support the Jefferson Parish Animal Shelter.';
  }));

  it('is created', inject([SiteService], (siteService: SiteService) => {
    expect(siteService).toBeTruthy();
  }));

  it('converts data going to the database', () => {
    const converted = service.convertIn(site);
    expect(converted).toEqual(testSites[0]);
  });

  it('converts coming from the database', () => {
    const converted = service.convertOut(organization);
    expect(converted).toEqual(testSites[0]);
  });
});
