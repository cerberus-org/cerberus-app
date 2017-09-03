import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationConfirmComponent } from './organization-confirm.component';

describe('OrganizationConfirmComponent', () => {
  let component: OrganizationConfirmComponent;
  let fixture: ComponentFixture<OrganizationConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
