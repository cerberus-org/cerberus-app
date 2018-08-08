import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { OrganizationDashboardPageComponent } from './organization-dashboard-page.component';

describe('OrganizationDashboardPageComponent', () => {
  let component: OrganizationDashboardPageComponent;
  let fixture: ComponentFixture<OrganizationDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganizationDashboardPageComponent,
        MockComponent({ selector: 'app-data-display', inputs: ['visits$'] }),
      ],
      imports: [
        RouterTestingModule,
        ...mockStoreModules,
      ],
      providers: [
        ...mockProviders,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
