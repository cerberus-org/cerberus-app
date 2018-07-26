import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../mock/classes/error.service.mock';
import { createMockSites, mockSites } from '../../mock/objects/site.mock';
import { Site } from '../../core/models';
import { ErrorService } from '../../shared/services/error.service';
import { SiteService } from './site.service';

describe('SiteService', () => {
  let service: SiteService;
  let site: Site;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(SiteService);
    site = createMockSites()[0];
    site.name = 'jefferson sPCA animal shelter';
    site.address = '1 humane way, new orleans, lA 70123';
  }));

  it('is created', inject([SiteService], (siteService: SiteService) => {
    expect(siteService).toBeTruthy();
  }));

  it('should convert coming from the database', () => {
    const converted = service.mapDocToObject(site);
    expect(converted).toEqual(mockSites[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDoc(site);
    expect(converted).toEqual(mockSites[0]);
  });
});
