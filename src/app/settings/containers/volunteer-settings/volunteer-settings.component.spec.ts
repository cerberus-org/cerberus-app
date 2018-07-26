import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { Volunteer } from '../../../core/models';
import * as SettingsActions from '../../store/actions/settings.actions';
import { VolunteerSettingsComponent } from './volunteer-settings.component';

describe('VolunteerSettingsComponent', () => {
  let component: VolunteerSettingsComponent;
  let fixture: ComponentFixture<VolunteerSettingsComponent>;
  let volunteer: Volunteer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolunteerSettingsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'getRowColor'],
        }),
      ],
      imports: [
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    volunteer = createMockVolunteers()[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle deleteVolunteer events by dispatching SettingsActions.DeleteVolunteer', () => {
    spyOn(component.store$, 'dispatch');
    component.onDeleteVolunteer(volunteer);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.DeleteVolunteer(volunteer));
  });

  it('should display the firstName of a volunteer in the first table column', () => {
    expect(component.columnOptions[0].cell(volunteer))
      .toEqual(volunteer.firstName);
  });

  it('should display the lastName of a volunteer in the second table column', () => {
    expect(component.columnOptions[1].cell(volunteer))
      .toEqual(volunteer.lastName);
  });

  it('should display the petName of a volunteer in the third table column', () => {
    expect(component.columnOptions[2].cell(volunteer))
      .toEqual(volunteer.petName);
  });
});
