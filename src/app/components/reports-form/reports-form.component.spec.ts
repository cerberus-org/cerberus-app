import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFormComponent } from './reports-form.component';

describe('ReportsFormComponent', () => {
  let component: ReportsFormComponent;
  let fixture: ComponentFixture<ReportsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
