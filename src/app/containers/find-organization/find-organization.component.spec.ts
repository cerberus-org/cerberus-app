import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOrganizationComponent } from './find-organization.component';

describe('FindOrganizationComponent', () => {
  let component: FindOrganizationComponent;
  let fixture: ComponentFixture<FindOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
