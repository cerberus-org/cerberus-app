import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockTeams } from '../../../../mocks/objects/team.mock';
import { mockProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { Go } from '../../../core/actions/router.actions';
import { MaterialModule } from '../../../material';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        ...mockStoreModules,
      ],
      declarations: [
        HomePageComponent,
        MockComponent({ selector: 'app-team-search', inputs: ['showTitle', 'showInputIconButton'] }),
        MockComponent({ selector: 'app-login' }),
      ],
      providers: mockProviders,
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle validInput events by setting findTeamValue', async(() => {
    const team = mockTeams[0];
    component.onValidTeam(team);
    expect(component.team).toEqual(team);
  }));

  it('should handle onLiveData events by dispatching RouterActions.Go', async(() => {
    spyOn(component.store$, 'dispatch');
    const team = mockTeams[0];
    component.onInputIconButtonClick(team);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new Go({ path: ['view-activity', team.name] }));
  }));
});
