import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatStepperModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { CheckInPageComponent } from './check-in-page.component';

describe('CheckInPageComponent', () => {
  let component: CheckInPageComponent;
  let fixture: ComponentFixture<CheckInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInPageComponent,
        MockComponent({
          selector: 'app-check-in-form',
          inputs: ['organizationId', 'siteId', 'visits', 'volunteers'],
        }),
        MockComponent({
          selector: 'app-new-volunteer-form',
          inputs: ['organizationId', 'changeTab'],
        }),
      ],
      imports: [
        MatTabsModule,
        NoopAnimationsModule,
        MatIconModule,
        RouterTestingModule,
        MatStepperModule,
        MatDialogModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when openServicesAgreementDialog is called', () => {
    spyOn(component.dialog, 'open');
    component.openServicesAgreementDialog();
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
