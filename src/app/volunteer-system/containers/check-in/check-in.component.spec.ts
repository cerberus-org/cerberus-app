import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatStepperModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { CheckInComponent } from './check-in.component';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInComponent,
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
    fixture = TestBed.createComponent(CheckInComponent);
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
