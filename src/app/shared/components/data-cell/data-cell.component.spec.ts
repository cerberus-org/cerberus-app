import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { testColumnOptions } from '../../models';
import { DataCellComponent } from './data-cell.component';

describe('DataCellComponent', () => {
  let component: DataCellComponent;
  let fixture: ComponentFixture<DataCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataCellComponent,
      ],
      imports: [
        MatSelectModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCellComponent);
    component = fixture.componentInstance;
    component.column = testColumnOptions[0];
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
});
