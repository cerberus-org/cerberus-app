import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import * as SettingsActions from '../../actions/settings.actions';
import { testOrganizations, testReports, testUsers, testVolunteers } from '../../models';
import { reducers } from '../../reducers';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsPageComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showDelete'],
        }),
        MockComponent({ selector: 'app-organization-form', inputs: ['initialOrganization'] }),
        MockComponent({ selector: 'app-reports-form' }),
        MockComponent({ selector: 'app-user-form', inputs: ['initialUser', 'passwordRequired'] }),
      ],
      imports: [
        StoreModule.forRoot(reducers),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    component.currentOrganization = testOrganizations[0];
    component.currentUser = testUsers[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle userChanges events by setting userChanges', () => {
    component.onValidUser(testUsers[0]);
    expect(component.userChanges).toBe(testUsers[0]);
  });

  it('should handle organizationChanges events by setting organizationChanges', () => {
    component.onValidOrganization(testOrganizations[0]);
    expect(component.organizationChanges).toBe(testOrganizations[0]);
  });


  it('should handle validReport events by setting validReport', () => {
    component.onValidReport(testReports[0]);
    expect(component.validReport).toBe(testReports[0]);
  });

  it('should handle submitUser events by dispatching SettingsActions.UpdateUser', () => {
    spyOn(component.store, 'dispatch');
    const user = Object.assign({}, testUsers[0], { firstName: 'Edited' });
    component.onSubmitUser(user);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(user));
  });

  it('should handle updateOrganization events by dispatching SettingsActions.UpdateOrganization', () => {
    spyOn(component.store, 'dispatch');
    const organization = Object.assign({}, testOrganizations[0], { name: 'Edited' });
    component.onSubmitOrganization(organization);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateOrganization(organization));
  });

  it('should handle deleteVolunteer events by dispatching SettingsActions.DeleteVolunteer', () => {
    spyOn(component.store, 'dispatch');
    const volunteer = testVolunteers[0];
    component.onDeleteVolunteer(volunteer);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.DeleteVolunteer(volunteer));
  });

  it('should handle generateVisitHistoryReport events by dispatching SettingsActions.GenerateVisitHistoryReport', () => {
    spyOn(component.store, 'dispatch');
    component.validReport = testReports[0];
    component.currentOrganization = testOrganizations[0];
    component.volunteers = testVolunteers;
    component.onSubmitReport();
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.GenerateVisitHistoryReport({
        startedAt: testReports[0].startedAt,
        endedAt: testReports[0].endedAt,
        organizationId: testOrganizations[0].id,
        volunteers: testVolunteers,
      }));
  });
});
