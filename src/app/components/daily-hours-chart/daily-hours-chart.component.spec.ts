import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';

import { DailyHoursChartComponent } from './daily-hours-chart.component';
import { testVisits } from '../../models/visit';

describe('DailyHoursChartComponent', () => {
  let component: DailyHoursChartComponent;
  let fixture: ComponentFixture<DailyHoursChartComponent>;
  let testLabels: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DailyHoursChartComponent
      ],
      imports: [
        ChartsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHoursChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testLabels = ['Wed Jun 28', 'Thu Jun 29', 'Fri Jun 30', 'Sat Jul 1', 'Sun Jul 2'];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('sets up the line chart labels', () => {
    const latest = testVisits[4].startedAt;
    const labels = component.setupLineChartLabels(latest, 5, 'days');
    expect(labels.length).toEqual(5);
    labels.forEach((label, index) =>
      expect(label).toEqual(testLabels[index]));
  });

  it('sets up the line chart data', () => {
    const labels = [];
    const lineChartData = component.setupLineChartData(testVisits, labels)[0];
    expect(lineChartData.data.length).toEqual(5);
    expect(lineChartData.data[0]).toEqual(0);
    expect(lineChartData.data[1]).toEqual(10);
    expect(lineChartData.label).toEqual('Hours');
  });
});
