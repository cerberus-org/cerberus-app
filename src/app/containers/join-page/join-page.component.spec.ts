import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { MatStepperModule } from '@angular/material';
import { JoinPageComponent } from '../../containers';
import { testOrganizations, testUsers } from '../../models';
import { reducers } from '../../reducers';
import { AuthService, SnackBarService } from '../../services';
import { mockServiceProviders } from '../../services/mock-service-providers';

describe('JoinPageComponent', () => {
  let component: JoinPageComponent;
  let fixture: ComponentFixture<JoinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinPageComponent,
        MockComponent({ selector: 'app-user-form', inputs: ['passwordRequired'] }),
        MockComponent({ selector: 'app-find-organization' }),
        MockComponent({ selector: 'app-terms-of-service' }),
      ],
      imports: [
        StoreModule.forRoot(reducers),
        MatStepperModule,
        BrowserAnimationsModule,
      ],
      providers: [].concat(mockServiceProviders),
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle userChanges events by setting userChanges', () => {
    component.onValidUser(testUsers[0]);
    expect(component.validUser).toBe(testUsers[0]);
  });

  it('should handle check box change events by setting isTosChecked', () => {
    component.onTosChecked(true);
    expect(component.isTosChecked).toBe(true);
  });

  it('should get Organization by name', () => {
    component.organizations = testOrganizations;
    expect(component.getOrganizationByName(testOrganizations[0].name)).toEqual(testOrganizations[0]);
  });

  describe('onJoinOrganization', () => {

    it('should log out user and display requestToJoinOrganizationSuccess snack bar on success', () => {
      component.organizations = testOrganizations;
      component.validInput = testOrganizations[0].name;
      const snackBarSpy = spyOn(TestBed.get(SnackBarService), 'requestToJoinOrganizationSuccess');
      const authServiceSignOutSpy = spyOn(TestBed.get(AuthService), 'signOut');
      component.onJoinOrganization();
      expect(snackBarSpy).toHaveBeenCalled();
      expect(authServiceSignOutSpy).toHaveBeenCalled();
    });

    it('should display invalidOrganization snack bar on failure', () => {
      component.organizations = testOrganizations;
      component.validInput = 'abc';
      const snackBarSpy = spyOn(TestBed.get(SnackBarService), 'invalidOrganization');
      component.onJoinOrganization();
      expect(snackBarSpy).toHaveBeenCalled();
    });
  });
});
