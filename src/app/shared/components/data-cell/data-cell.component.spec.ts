import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockColumnOptions } from '../../../mock/objects/column-options.mock';
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

  it('should handle onTimeChange by emitting the selectedTime event', () => {
    spyOn(component.selectedTime, 'emit');
    const val = { target: { value: '3:00 ' } };
    component.onTimeChange(val);
    expect(component.selectedTime.emit).toHaveBeenCalledWith(val.target.value);
  });

  it('should handle onTimeChange by not emitting the selectedTime event if time is undefined', () => {
    spyOn(component.selectedTime, 'emit');
    const val = { target: { value: null } };
    component.onTimeChange(val);
    expect(component.selectedTime.emit).not.toHaveBeenCalled();
  });

  it('should get input type for SELECT', () => {
    component.selectOptions = ['a', 'b'];
    component.column.timePicker = null;
    expect(component.inputType).toEqual('SELECT');
  });

  it('should get input type for TIME_PICKER', () => {
    component.selectOptions = null;
    component.column.timePicker = true;
    expect(component.inputType).toEqual('TIME_PICKER');
  });

  it('should get input type for TEXT_ONLY', () => {
    component.selectOptions = null;
    component.column.timePicker = false;
    expect(component.inputType).toEqual('TEXT_ONLY');
  });
});
