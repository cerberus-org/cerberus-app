import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { TeamDashboardPageComponent } from './team-dashboard-page.component';

describe('TeamDashboardPageComponent', () => {
  let component: TeamDashboardPageComponent;
  let fixture: ComponentFixture<TeamDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamDashboardPageComponent,
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
    fixture = TestBed.createComponent(TeamDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
