import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NewOrganizationFormComponent } from './new-organization-form.component';
import { Organization } from '../../models/organization';

describe('NewOrganizationFormComponent', () => {
  let component: NewOrganizationFormComponent;
  let fixture: ComponentFixture<NewOrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrganizationFormComponent],
      imports: [
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
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

    it('validates min length', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('ABC');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    }));

    it('validates max length', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit Aenean Commodo Li');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));
  });

  describe('website control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['website'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('validates max length', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('Lorem.ipsum.dolor.sit.amet.consectetuer.adipiscing.elit.Aenean.commodo.ligula.eget.dolor' +
        '.Aenean.massa.Cum.sociis.natoque.penatibus.et.magnis.dis.parturient.montes.nascetur.ridiculus.mus.Donec.quam' +
        '.felis.ultricies.nec.pellentesque.eu.pretium.quis.Lorem.ipsum.com');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));

    it('accepts valid websites', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('website.com');
      expect(control.valid).toBeTruthy();
    }));

    xit('does not accept invalid websites', (() => {
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

    it('validates max length', (() => {
      const control = component.formGroup.controls['description'];
      control.setValue('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.' +
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));
  });
});
