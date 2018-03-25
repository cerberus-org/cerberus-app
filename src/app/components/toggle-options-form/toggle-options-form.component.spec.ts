import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleOptionsFormComponent } from './toggle-options-form.component';

describe('ToggleOptionsFormComponent', () => {
  let component: ToggleOptionsFormComponent;
  let fixture: ComponentFixture<ToggleOptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleOptionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleOptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
