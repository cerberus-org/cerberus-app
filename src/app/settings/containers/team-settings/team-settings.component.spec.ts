import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockTeams } from '../../../../mocks/objects/team.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { MaterialModule } from '../../../material';
import { UpdateTeam } from '../../actions/settings.actions';
import { TeamSettingsComponent } from './team-settings.component';

describe('TeamSettingsComponent', () => {
  let component: TeamSettingsComponent;
  let fixture: ComponentFixture<TeamSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ...mockStoreModules,
      ],
      declarations: [
        TeamSettingsComponent,
        MockComponent({ selector: 'app-team-form', inputs: ['initialTeam'] }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle teamEdits events by setting teamEdits', () => {
    component.onValidTeam(createMockTeams()[0]);
    expect(component.teamEdits).toEqual(createMockTeams()[0]);
  });

  it('should handle updateTeam events by dispatching UpdateTeam', () => {
    spyOn(component.store$, 'dispatch');
    const team = { ...createMockTeams()[0], name: 'Edited' };
    component.onSubmitTeam(team);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new UpdateTeam({ team }));
  });
});
