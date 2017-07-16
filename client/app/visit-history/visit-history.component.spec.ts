import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdListModule } from '@angular/material';

import { VisitHistoryComponent } from './visit-history.component';
import { MockVisitService, VisitService } from '../services/visit.service';
import { testVisits } from '../models/visit';

describe('VisitHistoryComponent', () => {
  let component: VisitHistoryComponent;
  let fixture: ComponentFixture<VisitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitHistoryComponent],
      imports: [
        MdListModule,
      ],
      providers: [
        { provide: VisitService, useClass: MockVisitService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getVisits').and.callFake(() => {
      return testVisits;
    });
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('creates a key for each unique date', () => {
    component.visits = testVisits;
    component.mapVisitsToDate();
    expect(component.dates.length).toEqual(2);
    expect(component.dates).toEqual([
      testVisits[0].startedAt.toDateString(),
      testVisits[2].startedAt.toDateString()
    ]);
  });

  it('maps the visits to the correct date key', () => {
    component.visits = testVisits;
    component.mapVisitsToDate();
    expect(component.visitsByDate.get(component.dates[0])).toEqual([
      testVisits[0],
      testVisits[1]
    ]);
    expect(component.visitsByDate.get(component.dates[1])).toEqual([
      testVisits[2]
    ]);
  });

  it('formats times properly', () => {
    const formatted = component.formatTime(testVisits[0].startedAt, testVisits[0].timezone);
    expect(formatted).toEqual('5:45 am')
  });

  it('formats durations properly', () => {
    const formatted = component.formatDuration(testVisits[1]);
    expect(formatted).toEqual('5 hours, 59 minutes')

  });
});
