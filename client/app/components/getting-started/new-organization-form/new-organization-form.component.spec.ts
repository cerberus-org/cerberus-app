import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrganizationFormComponent } from './new-organization-form.component';

describe('NewOrganizationFormComponent', () => {
  let component: NewOrganizationFormComponent;
  let fixture: ComponentFixture<NewOrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrganizationFormComponent ]
    })
    .compileComponents();
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
