import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';

import { DailyHoursChartComponent } from './daily-hours-chart.component';
import { testVisits } from '../../models/visit';
import { visitReducer } from '../../reducers/visit';
import { forEach } from '@angular/router/src/utils/collection';

describe('DailyHoursChartComponent', () => {
  let component: DailyHoursChartComponent;
  let fixture: ComponentFixture<DailyHoursChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DailyHoursChartComponent
      ],
      imports: [
        ChartsModule,
        StoreModule.provideStore({ visits: visitReducer })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHoursChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('creates a key for each unique date', () => {
    component.mapVisitsToDate(testVisits);
    const dates = Array.from(component.visitsByDate.keys());
    expect(dates.length).toEqual(2);
    expect(dates).toEqual([
      testVisits[0].startedAt.toDateString(),
      testVisits[2].startedAt.toDateString()
    ]);
  });

  it('maps the visits to the correct date key', () => {
    component.mapVisitsToDate(testVisits);
    const dates = Array.from(component.visitsByDate.keys());
    expect(component.visitsByDate.get(dates[0])).toEqual([
      testVisits[0],
      testVisits[1]
    ]);
    expect(component.visitsByDate.get(dates[1])).toEqual([
      testVisits[2]
    ]);
  });

  it('it sets the line chart labels to the correct dates', () => {
    const latest = new Date('2017-07-01T14:45:42.336Z');
    component.setLineChartLabels(latest, 3);
    const labels = component.lineChartLabels;
    expect(labels.length).toEqual(3);
    expect(labels).toEqual([
      'Thu Jun 29 2017',
      'Fri Jun 30 2017',
      'Sat Jul 01 2017'
    ]);
  });

  it('it sets the line chart data to the correct values', () => {
    component.mapVisitsToDate(testVisits); // TODO: Find a way to test without using this function
    component.lineChartLabels = [
      'Thu Jun 29 2017',
      'Fri Jun 30 2017',
      'Sat Jul 01 2017'
    ];
    component.setLineChartData();
    const data = component.lineChartData[0].data;
    expect(data.length).toEqual(3);
    expect(data).toEqual([9, 5, 0]);
  });
});
