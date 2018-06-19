import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule, MatCardModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import * as RouterActions from '../../actions/router.actions';
import { testOrganizations } from '../../models';
import { reducers } from '../../reducers';

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
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        BrowserAnimationsModule,
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

  it('should handle validInput events by setting organizationName', () => {
    component.onValidInput(testOrganizations[0].name);
    expect(component.organizationName).toEqual(testOrganizations[0].name);
  });

  it('should handle onLiveData events by dispatching RouterActions.Go', () => {
    spyOn(component.store, 'dispatch');
    component.onInputIconButtonClick(testOrganizations[0].name);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new RouterActions.Go({ path: ['/public-dashboard/' + testOrganizations[0].name] }));
  });

  it('should handle onNewOrganization events by dispatching RouterActions.Go', () => {
    spyOn(component.store, 'dispatch');
    component.onNewOrganization();
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new RouterActions.Go({ path: ['/start'] }));
  });

  it('should handle onJoinOrganization events by dispatching RouterActions.Go', () => {
    spyOn(component.store, 'dispatch');
    component.onJoinOrganization();
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new RouterActions.Go({ path: ['/join'] }));
  });
});
