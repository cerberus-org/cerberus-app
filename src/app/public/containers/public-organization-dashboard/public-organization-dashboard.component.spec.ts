import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockServiceProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { PublicOrganizationDashboardComponent } from './public-organization-dashboard.component';

describe('PublicOrganizationDashboardComponent', () => {
  let component: PublicOrganizationDashboardComponent;
  let fixture: ComponentFixture<PublicOrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicOrganizationDashboardComponent,
        MockComponent({ selector: 'app-data-display', inputs: ['visits$'] }),
      ],
      imports: [
        ...mockStoreModules,
      ],
      providers: [
        ...mockServiceProviders,
      ],
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
