import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockColumnOptions } from '../../../../mocks/objects/column-options.mock';
import { DataCellComponent } from './data-cell.component';

describe('DataCellComponent', () => {
  let component: DataCellComponent;
  let fixture: ComponentFixture<DataCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        NoopAnimationsModule,
      ],
      declarations: [
        DataCellComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCellComponent);
    component = fixture.componentInstance;
    component.column = mockColumnOptions[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle onSelectionChange by emitting the selectOption event', () => {
    spyOn(component.selectOption, 'emit');
    const value = 'value';
    component.onSelectionChange(value);
    expect(component.selectOption.emit).toHaveBeenCalledWith(value);
  });

  it('should handle onTimeChange by emitting the selectedTime event if the new time does not match the previous time', () => {
    spyOn(component.selectedTime, 'emit');
    const val = { target: { value: '3:00 ' } };
    component.onTimeChange(val, '4:00');
    expect(component.selectedTime.emit).toHaveBeenCalledWith(val.target.value);
  });

  it('should handle onTimeChange by not emitting the selectedTime event if time is undefined', () => {
    spyOn(component.selectedTime, 'emit');
    const val = { target: { value: null } };
    component.onTimeChange(val, '3:00');
    expect(component.selectedTime.emit).not.toHaveBeenCalled();
  });

  it('should handle onTimeChange by not emitting the selectedTime event if the new time matches the previous time', () => {
    spyOn(component.selectedTime, 'emit');
    const val = { target: { value: '3:00' } };
    component.onTimeChange(val, '3:00');
    expect(component.selectedTime.emit).not.toHaveBeenCalled();
  });

  it('should get input type for SELECT', () => {
    component.selectOptions = ['a', 'b'];
    component.column.isTime = false;
    expect(component.inputType).toEqual('SELECT');
  });

  it('should get input type for TIME_PICKER', () => {
    component.selectOptions = null;
    component.column.isTime = true;
    expect(component.inputType).toEqual('TIME_PICKER');
  });

  it('should get input type for TEXT_ONLY', () => {
    component.selectOptions = null;
    component.column.isTime = false;
    expect(component.inputType).toEqual('TEXT_ONLY');
  });
});
