import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatToolbarModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { VisitWithVolunteer } from '../../../shared/models/visit-with-volunteer';
import { SiteDialogComponent } from '../../components/site-dialog/site-dialog.component';
import { VisitsComponent } from './visits.component';

describe('Visits Component', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;
  let visitWithVolunteer: VisitWithVolunteer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteDialogComponent,
        VisitsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete'],
        }),
      ],
      imports: [
        MatToolbarModule,
        MatDialogModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsComponent);
    component = fixture.componentInstance;
    visitWithVolunteer = {
      ...createMockVisits()[0],
      volunteer: createMockVolunteers()[0],
      organizationSites: createMockSites(),
      selectedSite: createMockSites()[0],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
