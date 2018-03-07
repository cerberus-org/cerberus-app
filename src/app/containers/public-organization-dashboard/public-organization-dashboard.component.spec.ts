import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOrganizationDashboardComponent } from './public-organization-dashboard.component';

describe('PublicOrganizationDashboardComponent', () => {
  let component: PublicOrganizationDashboardComponent;
  let fixture: ComponentFixture<PublicOrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOrganizationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
