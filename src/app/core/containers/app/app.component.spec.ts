import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockComponent } from 'ng2-mock-component';
import { createMockUserInfo } from '../../../../mocks/objects/user.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { AppUpdateService } from '../../services/app-update.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
    fixture = TestBed.createComponent(AppComponent);
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
});
