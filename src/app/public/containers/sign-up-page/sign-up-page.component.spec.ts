import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { SignUpPageComponent } from './sign-up-page.component';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpPageComponent,
        MockComponent({ selector: 'app-about-us' }),
        MockComponent({ selector: 'app-find-organization', inputs: ['showTitle', 'showInputIconButton'] }),
        MockComponent({ selector: 'app-organization-form' }),
        MockComponent({ selector: 'app-user-form', inputs: ['initialMember', 'passwordRequired'] }),
        MockComponent({ selector: 'app-organization-confirm', inputs: ['email', 'member', 'organization'] }),
        MockComponent({ selector: 'app-services-agreement', inputs: ['showTitle'] }),
      ],
      imports: [
        MatButtonModule,
        MatTabsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        RouterTestingModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
