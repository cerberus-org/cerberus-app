import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDataDisplayComponent } from './visit-data-display.component';

describe('VisitDataDisplayComponent', () => {
  let component: VisitDataDisplayComponent;
  let fixture: ComponentFixture<VisitDataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDataDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
