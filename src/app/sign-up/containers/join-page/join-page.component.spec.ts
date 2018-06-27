import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatStepperModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';
import { AuthService } from '../../../auth/services/auth.service';
import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { JoinPageComponent } from './join-page.component';

describe('JoinPageComponent', () => {
  let component: JoinPageComponent;
  let fixture: ComponentFixture<JoinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JoinPageComponent,
        MockComponent({ selector: 'app-user-form', inputs: ['initialUser', 'passwordRequired'] }),
        MockComponent({ selector: 'app-find-organization', inputs: ['showTitle', 'showInputIconButton'] }),
        MockComponent({ selector: 'app-services-agreement', inputs: ['showTitle'] }),
      ],
      imports: [
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatStepperModule,
        ...mockStoreModules,
      ],
      providers: [
        ...mockServiceProviders,
      ],
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

  it('should handle userEdits events by setting userEdits', () => {
    component.onValidUser(createMockUsers()[0]);
    expect(component.validUser).toEqual(createMockUsers()[0]);
  });

  it('should get Organization by name', () => {
    component.organizations = mockOrganizations;
    expect(component.getOrganizationByName(mockOrganizations[0].name)).toEqual(mockOrganizations[0]);
  });

  describe('onJoinOrganization', () => {

    it('should log out user and display requestToJoinOrganizationSuccess snack bar on success', () => {
      component.organizations = mockOrganizations;
      component.validInput = mockOrganizations[0].name;
      component.isTosChecked = true;
      const snackBarSpy = spyOn(TestBed.get(SnackBarService), 'requestToJoinOrganizationSuccess');
      const authServiceSignOutSpy = spyOn(TestBed.get(AuthService), 'signOut');
      component.onJoinOrganization();
      expect(snackBarSpy).toHaveBeenCalled();
      expect(authServiceSignOutSpy).toHaveBeenCalled();
    });

    it('should display invalidOrganization snack bar on failure', () => {
      component.organizations = mockOrganizations;
      component.validInput = 'abc';
      component.isTosChecked = true;
      const snackBarSpy = spyOn(TestBed.get(SnackBarService), 'invalidOrganization');
      component.onJoinOrganization();
      expect(snackBarSpy).toHaveBeenCalled();
    });
  });
});
