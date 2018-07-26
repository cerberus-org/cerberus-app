import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockComponent } from 'ng2-mock-component';
import { createMockUserInfo } from '../../../mock/objects/user.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { AppUpdateService } from '../../services/app-update.service';
import * as ModelActions from '../../store/actions/model.actions';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RootComponent,
        MockComponent({ selector: 'app-footer' }),
        MockComponent({ selector: 'app-header' }),
        MockComponent({ selector: 'app-loader', inputs: ['text'] }),
        MockComponent({ selector: 'app-sidenav' }),
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
});
