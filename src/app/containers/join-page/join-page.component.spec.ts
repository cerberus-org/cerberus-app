import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

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
      ],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
      ],
      providers: [

      ].concat(mockServiceProviders),
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

  it('should get Organization by name', () => {
    expect(component.getOrganizationByName(testOrganizations[0].name)).toBe(testOrganizations[0]);
  });

  it('should filter Organizations based on name', () => {
    expect(component.filterOrganizationsByName(testOrganizations, 'Jefferson')).toEqual([testOrganizations[0]]);
  });

  describe('onJoinOrganization', () => {

    it('should log out user and display requestToJoinOrganizationSuccess snack bar on success', () => {
      const snackBarSpy = spyOn(TestBed.get(SnackBarService), 'requestToJoinOrganizationSuccess');
      const authServiceSignOutSpy = spyOn(TestBed.get(AuthService), 'signOut');
      component.onJoinOrganization(testOrganizations[0].name);
      expect(snackBarSpy).toHaveBeenCalled();
      expect(authServiceSignOutSpy).toHaveBeenCalled();
    });

    it('should display invalidOrganization snack bar on failure', () => {
      const snackBarSpy = spyOn(TestBed.get(SnackBarService), 'invalidOrganization');
      component.onJoinOrganization('abc');
      expect(snackBarSpy).toHaveBeenCalled();
    });
  });
});
