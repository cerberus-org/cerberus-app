import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NewOrganizationFormComponent } from './new-organization-form.component';

describe('NewOrganizationFormComponent', () => {
  let component: NewOrganizationFormComponent;
  let fixture: ComponentFixture<NewOrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrganizationFormComponent],
      imports: [
        MdInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('name control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['name'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));
  });

  describe('website control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['website'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('accepts valid websites', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('website.com');
      expect(control.valid).toBeTruthy();
    }));

    it('does not accept invalid websites', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('notAWebsite');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
    }));
  });

  describe('description control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['description'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));
  });
});
