import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockComponent } from 'ng2-mock-component';
import { authReducers } from '../../../auth/store/reducers/index';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { rootReducers } from '../../store/reducers/index';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
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
        { provide: AngularFireAuth, useValue: null },
      ],
    })
      .compileComponents();
  }));

  it('should create the root', async(() => {
    const fixture = TestBed.createComponent(RootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
