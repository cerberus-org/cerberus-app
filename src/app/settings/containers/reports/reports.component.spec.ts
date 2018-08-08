import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockReports } from '../../../../mocks/objects/report.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { GenerateReport } from '../../actions/settings.actions';
import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReportsComponent,
        MockComponent({ selector: 'app-reports-form' }),
      ],
      imports: [
        ...mockStoreModules,
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
    'should handle generateVisitHistoryReport events by dispatching GenerateReport',
    () => {
      component.validReport = mockReports[0];
      spyOn(component.store$, 'dispatch');
      component.onSubmitReport();
      expect(component.store$.dispatch).toHaveBeenCalledWith(
        new GenerateReport({
          startedAt: mockReports[0].startedAt,
          endedAt: mockReports[0].endedAt,
        }),
      );
    },
  );
});
