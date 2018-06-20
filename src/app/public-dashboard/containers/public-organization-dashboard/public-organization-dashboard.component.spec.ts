import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { reducers } from '../../../root/store/reducers';
import { PublicOrganizationDashboardComponent } from './public-organization-dashboard.component';

describe('PublicOrganizationDashboardComponent', () => {
  let component: PublicOrganizationDashboardComponent;
  let fixture: ComponentFixture<PublicOrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        PublicOrganizationDashboardComponent,
        MockComponent({ selector: 'app-data-display', inputs: ['visits$'] }),
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
