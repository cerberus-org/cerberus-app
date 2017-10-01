import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';

import { OrganizationDashboardComponent } from './organization-dashboard.component';
import { SiteService, MockSiteService } from '../../services/site.service';
import { MockOrganizationService, OrganizationService } from '../../services/organization.service';
import { MockVisitService, VisitService } from '../../services/visit.service';

describe('OrganizationDashboardComponent', () => {
  let component: OrganizationDashboardComponent;
  let fixture: ComponentFixture<OrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [OrganizationDashboardComponent,
        MockComponent({ selector: 'app-data-display' }),
        MockComponent({ selector: 'app-volunteer-menu' })
      ],
      providers: [
        { provide: SiteService, useClass: MockSiteService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: VisitService, useClass: MockVisitService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('local storage should be cleared', () => {
    component.logout();
    expect(localStorage.token).toBe(undefined);
  });
});
