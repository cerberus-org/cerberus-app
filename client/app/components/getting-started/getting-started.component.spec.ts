import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { GettingStartedComponent } from './getting-started.component';
import { MockSiteService, SiteService } from '../../services/site.service';
import { MockOrganizationService, OrganizationService } from '../../services/organization.service';
import { MockSnackBarService, SnackBarService } from '../../services/snack-bar.service';
import { MockUserService, UserService } from '../../services/user.service';
import { reducers } from '../../reducers/index';

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
        MatButtonModule,
        MatTabsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: SiteService, useClass: MockSiteService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: SnackBarService, useClass: MockSnackBarService },
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
});
