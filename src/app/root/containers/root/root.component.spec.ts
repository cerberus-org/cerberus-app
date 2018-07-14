import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockComponent } from 'ng2-mock-component';
import { createMockHeaderOptions } from '../../../mock/objects/header-options.mock';
import { createMockSidenavOptions } from '../../../mock/objects/sidenav-options.mock';
import { createMockUserInfo } from '../../../mock/objects/user.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AppUpdateService } from '../../services/app-update.service';
import * as ModelActions from '../../store/actions/model.actions';
import { RootComponent } from './root.component';

fdescribe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RootComponent,
        MockComponent({ selector: 'app-footer' }),
        MockComponent({
          selector: 'app-header',
          inputs: ['headerOptions', 'showLogOut', 'showSidenavToggle'],
        }),
        MockComponent({ selector: 'app-loader', inputs: ['text'] }),
        MockComponent({ selector: 'app-sidenav', inputs: ['sidenavOptions'] }),
      ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        ...mockStoreModules,
      ],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {
            auth: {
              onAuthStateChanged: () => {},
            },
          },
        },
        { provide: AppUpdateService, useValue: null },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should set the onAuthStateChanged callback during init', async(() => {
    const onAuthStateChanged = spyOn(TestBed.get(AngularFireAuth).auth, 'onAuthStateChanged');
    fixture.detectChanges();
    expect(onAuthStateChanged).toHaveBeenCalledWith(jasmine.any(Function));
  }));

  it('should handle auth state changes by setting isLoggedIn to true if a user is logged in during init', async(() => {
    component.handleAuthStateChanged(createMockUserInfo()[0]);
    expect(component.isLoggedIn).toEqual(true);
  }));

  it('should handle auth state changes by setting isLoggedIn to false if a user is not logged in during init', async(() => {
    component.handleAuthStateChanged(null);
    expect(component.isLoggedIn).toEqual(false);
  }));

  it('should select the layout state during init', async(() => {
    fixture.detectChanges();
    component.layoutState$.subscribe((value) => {
      expect(value).toEqual({
        headerOptions: createMockHeaderOptions()[0],
        sidenavOptions: createMockSidenavOptions(),
      });
    });
  }));

  it('should select the model loaded state during ngOnInit', (done) => {
    // Use whenStable to wait for delay
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.modelIsLoaded$.subscribe((value) => {
        expect(value).toEqual(true);
        done();
      });
    });
  });

  it('should dispatch ModelActions.LoadOrganizations during ngOnInit', async(() => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    fixture.detectChanges();
    expect(dispatch).toHaveBeenCalledWith(new ModelActions.LoadOrganizations());
  }));

  it('should handle selectOption events from the sidenav component by dispatching the option value\'s action', async(() => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    const option = createMockSidenavOptions()[0];
    const sidenav = fixture.debugElement.query(By.css('app-sidenav'));
    sidenav.triggerEventHandler('selectOption', option);
    expect(dispatch).toHaveBeenCalledWith(option.action);
  }));

  fit('should handle buttonClick events from the header with value toggle_sidenav by toggling the sidenav', async(() => {
    const toggle = spyOn(, 'toggle');
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('app-header'));
    header.triggerEventHandler('buttonClick', 'toggle_sidenav');
    expect(toggle).toHaveBeenCalled();
  }));
});
