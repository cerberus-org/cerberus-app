import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { Observable } from 'rxjs/Observable';

import { testColumnOptions, testVisits, testVolunteers } from '../../models';
import { DataTableComponent, DataTableSource } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableComponent,
        MockComponent({ selector: 'app-data-cell', inputs: ['column', 'row'] }),
      ],
      imports: [
        CdkTableModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.columnOptions = testColumnOptions;
    component.data$ = Observable.of(testVisits);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render data for a specific page', () => {
    component.dataSource = new DataTableSource(component.data$, component.paginator);
    component.paginator.pageIndex = 1;
    component.paginator.pageSize = 2;
    const pageData = component.dataSource.getPageData();
    expect(pageData.length).toEqual(2);
  });

  it('should handle click delete events by emitting a delete item event', () => {
    spyOn(component.deleteItem, 'emit');
    const item = testVolunteers[0];
    component.onClickDelete(item);
    expect(component.deleteItem.emit).toHaveBeenCalledWith(item);
  });

  it('should handle select option events by emitting an update item event', () => {
    spyOn(component.updateItem, 'emit');
    const value = 'Admin';
    const item = testVolunteers[0];
    const key = 'role';
    component.onSelectOption(value, item, key);
    expect(component.updateItem.emit).toHaveBeenCalledWith(value, item, key);
  });
});
