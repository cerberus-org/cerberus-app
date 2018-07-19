import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';
import { updateDateWithTimeInput } from '../../../functions';
import { mockColumnOptions } from '../../../mock/objects/column-options.mock';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { Visit } from '../../../models';
import { DataTableComponent, DataTableSource } from './data-table.component';

fdescribe('DataTableComponent', () => {
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
        NoopAnimationsModule,
      ],
      declarations: [
        DataTableComponent,
        MockComponent({ selector: 'app-data-cell', inputs: ['column', 'row', 'isBold', 'color'] }),
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

  it('should handle clickDelete events by emitting a deleteItem event', () => {
    spyOn(component.deleteItem, 'emit');
    const item = visits[0];
    component.onClickDelete(item);
    expect(component.deleteItem.emit).toHaveBeenCalledWith(item);
  });

  it('should handle selectOption events by emitting an updateItem event', () => {
    spyOn(component.updateItem, 'emit');
    const value = 'Admin';
    const item = visits[0];
    const key = 'role';
    const expected = { ...item, role: value };
    component.onSelectOption(value, item, key);
    expect(component.updateItem.emit).toHaveBeenCalledWith(expected);
  });

  it('should sets background-color to an empty string on default', () => {
    expect(component.getRowColor(visits[0])).toEqual('');
  });

  it('should sets background-color to an empty string on default', () => {
    expect(component.getRowColor(visits[0])).toEqual('');
  });

  it('should not set cell font-color to red if invalidItemsEdited does not have a length', () => {
    expect(component.getCellFontColor('b')).toEqual('');
  });

  it('should set cell font-color to red if invalidItemsEdited has a length', () => {
    component.invalidItemsEdited = [{ id: 'a' }];
    expect(component.getCellFontColor({ id: 'a' })).toEqual('#f44336');
  });

  it('should not set cell font-weight to bold if there are not items edited', () => {
    expect(component.getCellFontWeight('b')).toEqual('');
  });

  it('should set cell font-weight to bold if there are items edited', () => {
    component.itemsEdited = ['a'];
    expect(component.getCellFontWeight('b')).toEqual('bold');
  });

  it('should call addItemToItemsEdited onSelectTime', () => {
    spyOn(component, 'addItemToItemsEditedOrInvalidItemsEdited');
    const column = { timePicker: { isTime: true, updateItemWithTime: () => {} } };
    component.onSelectTime('3:00', visits[0], column);
    expect(component.addItemToItemsEditedOrInvalidItemsEdited).toHaveBeenCalled();
  });

  it('should call emit updateMultipleItems onUpdateItems and clear itemsEdited', () => {
    spyOn(component.updateMultipleItems, 'emit');
    component.itemsEdited = ['a'];
    component.onUpdateItems([visits[0], visits[1]]);
    expect(component.updateMultipleItems.emit).toHaveBeenCalledWith([visits[0], visits[1]]);
    expect(component.itemsEdited).toEqual([]);
  });

  it('should add item to itemsEdited when addItemToItemsEditedOrInvalidItemsEdited is called', () => {
    component.itemsEdited = [];
    const column = { columnDef: 'endedAt', validator: (item) => { return true; } };
    component.addItemToItemsEditedOrInvalidItemsEdited(visits[0], column);
    expect(component.itemsEdited).toEqual([visits[0]]);
  });

  it('should add item to invalidItemsEdited when addItemToItemsEditedOrInvalidItemsEdited is called', () => {
    component.invalidItemsEdited = [];
    component.addItemToItemsEditedOrInvalidItemsEdited(visits[0], { validator: (item) => { return false; } });
    expect(component.invalidItemsEdited).toEqual([visits[0]]);
  });

  it(
    'should remove pre-exiting updated item from itemsEdited and add most recently updated item to itemsEdited when addItemToItemsEditedOrInvalidItemsEdited is called',
    () => {
      component.itemsEdited = [visits[0]];
      const mostRecentlyUpdatedItem = Object.assign({}, visits[0], { endedAt: updateDateWithTimeInput('3:00', visits[0].endedAt) });
      component.addItemToItemsEditedOrInvalidItemsEdited(mostRecentlyUpdatedItem, { validator: (item) => { return true; } });
      expect(component.itemsEdited[0]).toEqual(mostRecentlyUpdatedItem);
      expect(component.itemsEdited.length).toEqual(1);
    },
  );

  it('should display update button', () => {
    expect(component.displayUpdateButton('b', ['a', 'b'], true)).toBe(true);
  });

  it('should not display update button', () => {
    expect(component.displayUpdateButton('a', ['a', 'b'], false)).toBe(false);
  });
});
