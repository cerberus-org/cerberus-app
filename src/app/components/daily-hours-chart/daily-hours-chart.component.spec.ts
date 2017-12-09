import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';

import { DailyHoursChartComponent } from './daily-hours-chart.component';
import { reducers } from '../../../reducers/index';

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
        StoreModule.forRoot(reducers)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHoursChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('sets up the line chart labels', () => {
    const state = fromDataDisplay.reducer(fromDataDisplay.initialState,
      new DataDisplayActions.LoadDataSuccess(testVisits));
    expect(state.lineChartLabels.length).toEqual(7);
  });

  it('sets up the line chart data', () => {
    const state = fromDataDisplay.reducer(fromDataDisplay.initialState,
      new DataDisplayActions.LoadDataSuccess(testVisits));
    const lineChartData = state.lineChartData[0];
    expect(lineChartData.data.length).toEqual(7);
    expect(lineChartData.label).toEqual('Hours');
  });
});
