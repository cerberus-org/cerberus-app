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
});
