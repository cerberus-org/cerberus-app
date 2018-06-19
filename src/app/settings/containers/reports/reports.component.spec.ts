import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import * as SettingsActions from '../../../actions/settings.actions';
import { testOrganizations, testReports, testVolunteers } from '../../../models';
import { reducers } from '../../../reducers';

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
    component.onValidReport(testReports[0]);
    expect(component.validReport).toEqual(testReports[0]);
  });

  it(
    'should handle generateVisitHistoryReport events by dispatching SettingsActions.GenerateVisitHistoryReport',
    () => {
      spyOn(component.store, 'dispatch');
      component.validReport = testReports[0];
      component.currentOrganization = testOrganizations[0];
      component.volunteers = testVolunteers;
      component.onSubmitReport();
      expect(component.store.dispatch)
        .toHaveBeenCalledWith(new SettingsActions.GenerateVisitHistoryReport({
          startedAt: testReports[0].startedAt,
          endedAt: testReports[0].endedAt,
          organizationId: testOrganizations[0].id,
          volunteers: testVolunteers,
        }));
    },
  );
});
