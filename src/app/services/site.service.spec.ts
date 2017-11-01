import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { SiteService } from './site.service';
import { ErrorService, MockErrorService } from './error.service';
import { Site, testSites } from '../models/site';

describe('SiteService', () => {
  let service: SiteService;
  let site: Site;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService }
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(SiteService);
    site = Object.assign({}, testSites[0]);
    site.name = 'jefferson sPCA animal shelter';
    site.address = '1 humane way, new orleans, lA 70123';
  }));

  it('is created', inject([SiteService], (siteService: SiteService) => {
    expect(siteService).toBeTruthy();
  }));

  it('converts coming from the database', () => {
    const converted = service.convertIn(site);
    expect(converted).toEqual(testSites[0]);
  });

  it('converts data going to the database', () => {
    const converted = service.convertOut(site);
    expect(converted).toEqual(testSites[0]);
  });
});
