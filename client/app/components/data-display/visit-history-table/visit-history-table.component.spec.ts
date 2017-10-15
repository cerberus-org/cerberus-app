import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { StoreModule } from '@ngrx/store';

import { VisitHistoryTableComponent } from './visit-history-table.component';
import { testVisits } from '../../../models/visit';
import { reducers } from '../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { initialState } from '../../../reducers/visits.reducer';

describe('VisitHistoryTableComponent', () => {
  let component: VisitHistoryTableComponent;
  let fixture: ComponentFixture<VisitHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisitHistoryTableComponent
      ],
      imports: [
        NoopAnimationsModule,
        CdkTableModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        StoreModule.forRoot(reducers)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryTableComponent);
    component = fixture.componentInstance;
    component.visits$ = Observable.of(Object.assign({}, initialState, { visits: testVisits }));
    fixture.detectChanges();
    spyOn(component.dataSource, 'subscribeToVisits').and.stub();
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
    expect(formatted).toEqual('6 hours')
  });

  it('it renders the correct page data', () => {
    component.ngOnInit();
    component.dataSource.visits = testVisits;
    component.paginator.pageIndex = 1;
    component.paginator.pageSize = 2;
    const pageData = component.dataSource.getPageData();
    expect(pageData.length).toEqual(2);
  });
});
