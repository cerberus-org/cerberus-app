import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { Volunteer } from '../../../shared/models';
import { DeleteVolunteer } from '../../actions/settings.actions';
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
          inputs: ['columnOptions', 'data$', 'showRemove', 'rowColor'],
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

  it('should handle deleteVolunteer events by dispatching DeleteVolunteer', () => {
    spyOn(component.store$, 'dispatch');
    component.onDeleteVolunteer(volunteer);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new DeleteVolunteer({ volunteer }));
  });

  it('should display the name of a volunteer in the first table column', () => {
    expect(component.columnOptions[0].cell(volunteer))
      .toEqual(volunteer.name);
  });

  it('should display the petName of a volunteer in the second table column', () => {
    expect(component.columnOptions[1].cell(volunteer))
      .toEqual(volunteer.petName);
  });
});
