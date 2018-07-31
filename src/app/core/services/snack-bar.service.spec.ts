import { inject, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [SnackBarService],
    });
  });

  it('should be created', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));

  it('should display message when createSiteSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.createSiteSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when updateAvailable is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.updateAvailable();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when signInError is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.signInError();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when resetPassword is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.resetPassword();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when accountNotVerified is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.accountNotVerified();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when invalidOrganization is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.invalidOrganization();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when joinOrganizationSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.joinOrganizationSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when checkOutSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.checkOutSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when checkInSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.checkInSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when updateOrganizationSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.updateOrganizationSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when updateVisitsSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.updateVisitsSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when updateUserSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.updateUserSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when signUpSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.signUpSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when createOrganizationSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.createOrganizationSuccess();
    expect(service.open).toHaveBeenCalled();
  }));

  it('should display message when signOutSuccess is called', inject([SnackBarService], (service: SnackBarService) => {
    spyOn(service, 'open');
    service.signOutSuccess();
    expect(service.open).toHaveBeenCalled();
  }));
});
