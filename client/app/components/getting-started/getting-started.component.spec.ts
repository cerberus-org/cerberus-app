import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MdButtonModule, MdSnackBarModule, MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { GettingStartedComponent } from './getting-started.component';
import { MockOrganizationService, OrganizationService } from '../../services/organization.service';
import { MockUserService, UserService } from '../../services/user.service';

describe('GettingStartedComponent', () => {
  let component: GettingStartedComponent;
  let fixture: ComponentFixture<GettingStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GettingStartedComponent,
        MockComponent({ selector: 'app-about-us' }),
        MockComponent({ selector: 'app-new-organization-form' }),
        MockComponent({ selector: 'app-new-user-form' }),
        MockComponent({ selector: 'app-organization-confirm', inputs: ['organization', 'user'] }),
        MockComponent({ selector: 'app-side-margins' })
      ],
      imports: [
        MdButtonModule,
        MdSnackBarModule,
        MdTabsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('sets step to the next step', () => {
    expect(component.nextStep(0, 1)).toEqual(1);
  });

  it('does not set step to the next step when backtracking', () => {
    expect(component.nextStep(2, 1)).toEqual(2);
  });
});
