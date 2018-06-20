import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { reducers } from '../../../root/store/reducers';
import { OrganizationDashboardComponent } from './organization-dashboard.component';

describe('OrganizationDashboardComponent', () => {
  let component: OrganizationDashboardComponent;
  let fixture: ComponentFixture<OrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        OrganizationDashboardComponent,
        MockComponent({ selector: 'app-data-display', inputs: ['visits$'] }),
      ],
      providers: [
        ...mockServiceProviders,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
