import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { testVolunteers } from '../../../models';
import { reducers } from '../../../reducers';
import * as SettingsActions from '../../store/settings.actions';
import { VolunteerSettingsComponent } from './volunteer-settings.component';

describe('VolunteerSettingsComponent', () => {
  let component: VolunteerSettingsComponent;
  let fixture: ComponentFixture<VolunteerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        VolunteerSettingsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete', 'getRowColor'],
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle deleteVolunteer events by dispatching SettingsActions.DeleteVolunteer', () => {
    spyOn(component.store, 'dispatch');
    const volunteer = testVolunteers[0];
    component.onDeleteVolunteer(volunteer);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.DeleteVolunteer(volunteer));
  });
});
