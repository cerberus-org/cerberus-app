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
    const date = testVisits[3].startedAt;
    component.setLineChartLabels(date);
    const labels = component.lineChartLabels.reverse();
    labels.forEach((label, i) => expect(label).toEqual(new Date(date.getDate() - i).toDateString()));
  });
});
