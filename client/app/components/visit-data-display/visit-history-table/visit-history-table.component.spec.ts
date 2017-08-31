import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdListModule, MdPaginatorModule, MdTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';

import { VisitHistoryTableComponent } from './visit-history-table.component';
import { StoreModule } from '@ngrx/store';
import { visitReducer } from '../../../reducers/visit';
import { testVisits } from '../../../models/visit';

describe('VisitHistoryTableComponent', () => {
  let component: VisitHistoryTableComponent;
  let fixture: ComponentFixture<VisitHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitHistoryTableComponent],
      imports: [
        NoopAnimationsModule,
        CdkTableModule,
        MdListModule,
        MdPaginatorModule,
        MdTableModule,
        StoreModule.provideStore({ visits: visitReducer })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitHistoryTableComponent);
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

  it('it renders the correct page data', () => {
    component.ngOnInit();
    component.dataSource.visits = testVisits;
    component.paginator.pageIndex = 1;
    component.paginator.pageSize = 2;
    const pageData = component.dataSource.getPageData();
    expect(pageData.length).toEqual(2);
  });
});
