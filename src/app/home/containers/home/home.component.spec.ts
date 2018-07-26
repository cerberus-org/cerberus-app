import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule, MatCardModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockOrganizations } from '../../../../mocks/objects/organization.mock';
import { mockStoreModules } from '../../../../mocks/store-modules.mock';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent({ selector: 'app-find-organization', inputs: ['showTitle', 'showInputIconButton'] }),
        MockComponent({ selector: 'app-login' }),
      ],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ...mockStoreModules,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle validInput events by setting findOrganizationValue', () => {
    component.onValidOrganization(mockOrganizations[0]);
    expect(component.organization).toEqual(mockOrganizations[0]);
  });

  it('should handle onLiveData events by dispatching RouterActions.Go', () => {
    spyOn(component.store$, 'dispatch');
    component.onInputIconButtonClick(mockOrganizations[0]);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new RouterActions.Go({ path: ['/public-dashboard/' + mockOrganizations[0].name] }));
  });

  it('should handle onNewOrganization events by dispatching RouterActions.Go', () => {
    spyOn(component.store$, 'dispatch');
    component.onNewOrganization();
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new RouterActions.Go({ path: ['/start'] }));
  });

  it('should handle onJoinOrganization events by dispatching RouterActions.Go', () => {
    spyOn(component.store$, 'dispatch');
    component.onJoinOrganization();
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new RouterActions.Go({ path: ['/join'] }));
  });
});
