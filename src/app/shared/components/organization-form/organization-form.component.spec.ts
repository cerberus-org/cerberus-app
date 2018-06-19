import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Organization, testOrganizations } from '../../../models/index';
import { OrganizationFormComponent } from './organization-form.component';

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent;
  let fixture: ComponentFixture<OrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationFormComponent],
      imports: [
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a organizationChanges event on valid form values', () => {
    spyOn(component.validOrganization, 'emit');
    const name = testOrganizations[0].name;
    const website = testOrganizations[0].website;
    const description = testOrganizations[0].description;
    component.formGroup.controls['name'].setValue(name);
    component.formGroup.controls['website'].setValue(website);
    component.formGroup.controls['description'].setValue(description);
    expect(component.validOrganization.emit).toHaveBeenCalledWith(new Organization(name, description, website));
  });

  describe('name control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['name'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate min length', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('ABC');
      expect(control.valid).toBeFalsy();
      expect(control.errors['minlength']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit Aenean Commodo Li');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should accept a valid name', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('website control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['website'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('Lorem.ipsum.dolor.sit.amet.consectetuer.adipiscing.elit.Aenean.commodo.ligula.eget.dolor' +
        '.Aenean.massa.Cum.sociis.natoque.penatibus.et.magnis.dis.parturient.montes.nascetur.ridiculus.mus.Donec.quam' +
        '.felis.ultricies.nec.pellentesque.eu.pretium.quis.Lorem.ipsum.com');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should validate the url', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('notAWebsite');
      expect(control.valid).toBeFalsy();
      expect(control.errors['invalidURL']).toBeTruthy();
    }));

    it('should accept a valid website', (() => {
      const control = component.formGroup.controls['website'];
      control.setValue('website.com');
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('description control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['description'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['description'];
      control.setValue('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.' +
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should accept a valid description', (() => {
      const control = component.formGroup.controls['description'];
      control.setValue('This is a test.');
      expect(control.valid).toBeTruthy();
    }));
  });
});
