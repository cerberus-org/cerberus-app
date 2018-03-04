import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCellComponent } from './data-cell.component';

describe('DataCellComponent', () => {
  let component: DataCellComponent;
  let fixture: ComponentFixture<DataCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
