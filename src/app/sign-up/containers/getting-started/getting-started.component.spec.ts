import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { rootReducers } from '../../../root/store/reducers';
import { signUpReducers } from '../../store/reducers';
import { GettingStartedComponent } from './getting-started.component';

describe('GettingStartedComponent', () => {
  let component: GettingStartedComponent;
  let fixture: ComponentFixture<GettingStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatTabsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        RouterTestingModule,
        StoreModule.forRoot(rootReducers),
        StoreModule.forFeature('signUp', signUpReducers),
      ],
      declarations: [
        GettingStartedComponent,
        MockComponent({ selector: 'app-about-us' }),
        MockComponent({ selector: 'app-organization-form' }),
        MockComponent({ selector: 'app-user-form', inputs: ['initialUser', 'passwordRequired'] }),
        MockComponent({ selector: 'app-organization-confirm', inputs: ['organization', 'user'] }),
        MockComponent({ selector: 'app-services-agreement', inputs: ['showTitle'] }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
