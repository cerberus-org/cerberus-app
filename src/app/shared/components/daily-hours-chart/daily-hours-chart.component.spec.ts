import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { DailyHoursChartComponent } from './daily-hours-chart.component';

describe('DailyHoursChartComponent', () => {
  let component: DailyHoursChartComponent;
  let fixture: ComponentFixture<DailyHoursChartComponent>;
  let testLabels: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
      ],
      declarations: [
        DailyHoursChartComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHoursChartComponent);
    component = fixture.componentInstance;
    component.data = [{ data: [], label: '' }];
    fixture.detectChanges();
    testLabels = ['Wed Jun 28', 'Thu Jun 29', 'Fri Jun 30', 'Sat Jul 1', 'Sun Jul 2'];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set up the line chart labels', () => {
    const latest = createMockVisits()[4].startedAt;
    const labels = component.setupLineChartLabels(latest, 5, 'ddd MMM D', 'days');
    expect(labels.length).toEqual(5);
    labels.forEach((label, index) =>
      expect(label).toEqual(testLabels[index]));
  });
});
