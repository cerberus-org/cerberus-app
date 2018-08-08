import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatToolbarModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { formatDate, formatDuration, formatTime, formatTimeInputValue } from '../../../shared/helpers';
import { VisitWithData } from '../../models/visit-with-data';
import { SiteDialogComponent } from '../site-dialog/site-dialog.component';
import { VisitSettingsComponent } from './visit-settings.component';

describe('Visits Component', () => {
  let component: VisitSettingsComponent;
  let fixture: ComponentFixture<VisitSettingsComponent>;
  let visitWithVolunteer: VisitWithData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteDialogComponent,
        VisitSettingsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'showEdit'],
        }),
      ],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatDialogModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitSettingsComponent);
    component = fixture.componentInstance;
    visitWithVolunteer = {
      ...createMockVisits()[0],
      volunteer: createMockVolunteers()[0],
      teamSites: createMockSites(),
      selectedSite: createMockSites()[0],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('column options', () => {
    it('should display the firstName and lastName of a volunteer in the first table column', () => {
      expect(component.columnOptions[0].cell(visitWithVolunteer))
        .toEqual(visitWithVolunteer.volunteer.name);
    });
    it('should display the site name in the second table column', () => {

      expect(component.columnOptions[1].cell(visitWithVolunteer))
        .toEqual('Jefferson SPCA Animal Shelter');
    });
    it('should display formatted date in the second table column', () => {
      expect(component.columnOptions[2].cell(visitWithVolunteer))
        .toEqual(formatDate(visitWithVolunteer.startedAt, visitWithVolunteer.timezone));
    });
    it('should display formatted time for start date in the third table column', () => {
      expect(component.columnOptions[3].cell(visitWithVolunteer))
        .toEqual(formatTime(visitWithVolunteer.startedAt, visitWithVolunteer.timezone));
    });
    it('should display formatted time for input of type time for endedAt in the fourth table column', () => {
      expect(component.columnOptions[4].cell(visitWithVolunteer))
        .toEqual(formatTimeInputValue(visitWithVolunteer.endedAt, visitWithVolunteer.timezone));
    });
    it('should display duration of visit fifth table column', () => {
      expect(component.columnOptions[5].cell(visitWithVolunteer))
        .toEqual(formatDuration(visitWithVolunteer.startedAt, visitWithVolunteer.endedAt, visitWithVolunteer.timezone));
    });
  });
});
