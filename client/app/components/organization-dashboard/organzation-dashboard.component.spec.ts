import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { OrganizationDashboardComponent } from './organization-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrganizationDashboardComponent', () => {
  let component: OrganizationDashboardComponent;
  let fixture: ComponentFixture<OrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [OrganizationDashboardComponent,
        MockComponent({ selector: 'app-visit-data-display' }),
        MockComponent({ selector: 'app-volunteer-menu' })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('local storage should be cleared', () => {
    component.logout();
    expect(localStorage.token).toBe(undefined);
  });
});
