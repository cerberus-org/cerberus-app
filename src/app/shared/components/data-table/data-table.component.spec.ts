import { CdkTableModule } from '@angular/cdk/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';
import { mockColumnOptions } from '../../../mock/objects/column-options.mock';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { Visit } from '../../../models';
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

  it('should call getUpdatedItemWithTime and addItemToItemsEdited onSelectTime', () => {
    spyOn(component, 'getUpdatedItemWithTime');
    spyOn(component, 'addItemToItemsEdited');
    component.onSelectTime('3:00', visits[0]);
    expect(component.getUpdatedItemWithTime).toHaveBeenCalled();
    expect(component.addItemToItemsEdited).toHaveBeenCalled();
  });

  it('should call emit updateMultipleItems onUpdateItems', () => {
    spyOn(component.updateMultipleItems, 'emit');
    component.onUpdateItems([visits[0], visits[1]]);
    expect(component.updateMultipleItems.emit).toHaveBeenCalledWith([visits[0], visits[1]]);
  });

  it('should add item to itemsEdited when addItemsToItemsEdited is called', () => {
    component.itemsEdited = [];
    component.addItemToItemsEdited(visits[0]);
    expect(component.itemsEdited).toEqual([visits[0]]);
  });

  it(
    'should remove pre-exiting updated item from itemsEdited and add most recently updated item to itemsEdited when addItemsToItemsEdited is called',
    () => {
      component.itemsEdited = [visits[0]];
      const mostRecentlyUpdatedItem = component.getUpdatedItemWithTime('3:00', visits[0]);
      component.addItemToItemsEdited(mostRecentlyUpdatedItem);
      expect(component.itemsEdited[0]).toEqual(mostRecentlyUpdatedItem);
      expect(component.itemsEdited.length).toEqual(1);
    },
  );

  it('should return item with updated time', () => {
    const updatedItem = component.getUpdatedItemWithTime('3:00', visits[0]);
    expect(updatedItem.endedAt.getHours()).toBe(3);
    expect(updatedItem.endedAt.getMinutes()).toBe(0);
    expect(updatedItem.endedAt.getSeconds()).toBe(0);
  });

  it('should display update button', () => {
    expect(component.displayUpdateButton('b', ['a', 'b'], false)).toBe(true);
  });

  it('should not display update button', () => {
    expect(component.displayUpdateButton('a', ['a', 'b'], false)).toBe(false);
  });
});
