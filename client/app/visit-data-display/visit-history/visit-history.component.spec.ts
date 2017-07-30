import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdListModule } from '@angular/material';

import { VisitHistoryComponent } from './visit-history.component';
import { testVisits } from '../../models/visit';
import { StoreModule } from '@ngrx/store';
import { visitReducer } from '../../reducers/visit';

describe('VisitHistoryComponent', () => {
  let component: VisitHistoryComponent;
  let fixture: ComponentFixture<VisitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitHistoryComponent],
      imports: [
        MdListModule,
        StoreModule.provideStore({ visits: visitReducer })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
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
