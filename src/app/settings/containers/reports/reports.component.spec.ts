import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { getMockOrganizations } from '../../../mock/objects/organization.mock';
import { mockReports } from '../../../mock/objects/report.mock';
import { getMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { reducers } from '../../../root/store/reducers/index';
import * as SettingsActions from '../../store/actions/settings.actions';
import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        ReportsComponent,
        MockComponent({ selector: 'app-reports-form' }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle validReport events by setting validReport', () => {
    component.onValidReport(mockReports[0]);
    expect(component.validReport).toEqual(mockReports[0]);
  });

  it(
    'should handle generateVisitHistoryReport events by dispatching SettingsActions.GenerateVisitHistoryReport',
    () => {
      spyOn(component.store, 'dispatch');
      component.validReport = mockReports[0];
      component.currentOrganization = getMockOrganizations()[0];
      component.volunteers = getMockVolunteers();
      component.onSubmitReport();
      expect(component.store.dispatch)
        .toHaveBeenCalledWith(new SettingsActions.GenerateVisitHistoryReport({
          startedAt: mockReports[0].startedAt,
          endedAt: mockReports[0].endedAt,
          organizationId: getMockOrganizations()[0].id,
          volunteers: getMockVolunteers(),
        }));
    },
  );
});
