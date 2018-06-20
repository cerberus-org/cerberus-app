import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';
import { getTestVisits, getTestVolunteers, testColumnOptions } from '../../../models';
import { DataTableComponent, DataTableSource } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        NoopAnimationsModule,
      ],
      declarations: [
        DataTableComponent,
        MockComponent({ selector: 'app-data-cell', inputs: ['column', 'row'] }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.columnOptions = testColumnOptions;
    component.data$ = of(getTestVisits());
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

  it('should handle clickDelete events by emitting a deleteItem event', () => {
    spyOn(component.deleteItem, 'emit');
    const item = getTestVolunteers()[0];
    component.onClickDelete(item);
    expect(component.deleteItem.emit).toHaveBeenCalledWith(item);
  });

  it('should handle selectOption events by emitting an updateItem event', () => {
    spyOn(component.updateItem, 'emit');
    const value = 'Admin';
    const item = getTestVolunteers()[0];
    const key = 'role';
    const expected = Object.assign({}, item, { role: value });
    component.onSelectOption(value, item, key);
    expect(component.updateItem.emit).toHaveBeenCalledWith(expected);
  });

  it('should sets background-color to an empty string on default', () => {
    expect(component.getRowColor(getTestVisits()[0])).toEqual('');
  });
});
