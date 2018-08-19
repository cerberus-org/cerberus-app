import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatToolbarModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { createMockSites } from '../../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { formatDate, formatDuration, formatTime } from '../../../shared/helpers';
import { VisitsTableRow } from '../../models/visits-table-row';
import { SiteDialogComponent } from '../site-dialog/site-dialog.component';
import { VisitsSettingsComponent } from './visits-settings.component';

describe('VisitsSettingsComponent', () => {
  let component: VisitsSettingsComponent;
  let fixture: ComponentFixture<VisitsSettingsComponent>;
  let visitWithData: VisitsTableRow;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteDialogComponent,
        VisitsSettingsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showRemove', 'showEdit'],
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
    fixture = TestBed.createComponent(VisitsSettingsComponent);
    component = fixture.componentInstance;
    visitWithData = {
      ...createMockVisits()[0],
      volunteer: createMockVolunteers()[0],
      site: createMockSites()[0],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('column options', () => {
    it('should display the firstName and lastName of a volunteer in the first table column', () => {
      expect(component.columnOptions[0].cell(visitWithData))
        .toEqual(visitWithData.volunteer.name);
    });

    it('should display the site name in the second table column', () => {
      expect(component.columnOptions[1].cell(visitWithData))
        .toEqual('Jefferson SPCA Animal Shelter');
    });

    it('should display formatted date in the second table column', () => {
      expect(component.columnOptions[2].cell(visitWithData))
        .toEqual(formatDate(visitWithData.startedAt, visitWithData.timezone));
    });

    it('should display formatted time for start date in the third table column', () => {
      expect(component.columnOptions[3].cell(visitWithData))
        .toEqual(formatTime(visitWithData.startedAt, visitWithData.timezone));
    });

    it('should display formatted time for input of type time for endedAt in the fourth table column', () => {
      expect(component.columnOptions[4].cell(visitWithData))
        .toEqual(formatTime(visitWithData.endedAt, visitWithData.timezone));
    });

    it('should display duration of visit fifth table column', () => {
      expect(component.columnOptions[5].cell(visitWithData))
        .toEqual(formatDuration(visitWithData.startedAt, visitWithData.endedAt, visitWithData.timezone));
    });
  });
});
