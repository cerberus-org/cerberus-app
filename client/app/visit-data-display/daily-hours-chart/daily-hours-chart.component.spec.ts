import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHoursChartComponent } from './daily-hours-chart.component';

describe('DailyHoursChartComponent', () => {
  let component: DailyHoursChartComponent;
  let fixture: ComponentFixture<DailyHoursChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyHoursChartComponent ]
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
});
