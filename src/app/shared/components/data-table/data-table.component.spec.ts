import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule, MatPaginatorModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';
import { mockColumnOptions } from '../../../../mocks/objects/column-options.mock';
import { createMockVisits } from '../../../../mocks/objects/visit.mock';
import { Visit } from '../../models';
import { DataTableComponent, DataTableSource } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let visits: Visit[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
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
    visits = createMockVisits();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.columnOptions = mockColumnOptions;
    component.data$ = of(createMockVisits());
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

  it('should handle clickDelete events by emitting a removeRow event', () => {
    spyOn(component.removeRow, 'emit');
    const item = visits[0];
    component.onClickRemove(item);
    expect(component.removeRow.emit).toHaveBeenCalledWith(item);
  });

  it('should handle selectOption events by emitting an updateRow event', () => {
    spyOn(component.updateRow, 'emit');
    const value = 'Admin';
    const item = visits[0];
    const key = 'role';
    const expected = { ...item, role: value };
    component.onSelectOption(value, item, key);
    expect(component.updateRow.emit).toHaveBeenCalledWith(expected);
  });

  it('should sets background-color to an empty string on default', () => {
    expect(component.getRowColor(visits[0])).toEqual('');
  });

  it('should sets background-color to an empty string on default', () => {
    expect(component.getRowColor(visits[0])).toEqual('');
  });
});
