import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChartsModule } from 'ng2-charts';

import { DailyHoursChartComponent } from './daily-hours-chart.component';
import { reducers } from '../../../reducers/index';
import { initialState } from '../../../reducers/visits.reducer';
import { testVisits } from '../../../models/visit';

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
    component.visits$ = Observable.of(Object.assign({}, initialState, { visits: testVisits }));
    fixture.detectChanges();
    spyOn(component, 'subscribeToVisits').and.stub();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
