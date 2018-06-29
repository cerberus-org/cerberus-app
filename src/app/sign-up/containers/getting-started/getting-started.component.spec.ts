import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { GettingStartedComponent } from './getting-started.component';

describe('GettingStartedComponent', () => {
  let component: GettingStartedComponent;
  let fixture: ComponentFixture<GettingStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GettingStartedComponent,
        MockComponent({ selector: 'app-about-us' }),
        MockComponent({ selector: 'app-organization-form' }),
        MockComponent({ selector: 'app-user-form', inputs: ['initialMember', 'passwordRequired'] }),
        MockComponent({ selector: 'app-organization-confirm', inputs: ['organization', 'user'] }),
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
    fixture = TestBed.createComponent(GettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
