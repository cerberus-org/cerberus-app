import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserFormComponent } from './new-user-form.component';
import { MdInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewUserFormComponent', () => {
  let component: NewUserFormComponent;
  let fixture: ComponentFixture<NewUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserFormComponent],
      imports: [
        MdInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
