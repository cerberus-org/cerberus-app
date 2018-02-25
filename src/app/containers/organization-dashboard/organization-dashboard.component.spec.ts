import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { reducers } from '../../reducers';
import {
  MockOrganizationService,
  MockSiteService,
  MockVisitService,
  OrganizationService,
  SiteService,
  VisitService,
} from '../../services';
import { OrganizationDashboardComponent } from './components';

describe('OrganizationDashboardComponent', () => {
  let component: OrganizationDashboardComponent;
  let fixture: ComponentFixture<OrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        OrganizationDashboardComponent,
        MockComponent({ selector: 'app-data-display' }),
        MockComponent({ selector: 'app-volunteer-menu', inputs: ['sites'] }),
      ],
      providers: [
        { provide: SiteService, useClass: MockSiteService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: VisitService, useClass: MockVisitService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
