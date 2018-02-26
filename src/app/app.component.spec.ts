import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { AppComponent } from './app.component';
import { reducers } from './reducers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
        MatDialogModule,
      ],
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-footer' }),
        MockComponent({
          selector: 'app-header',
          inputs: ['headerOptions', 'showLogOut', 'showSidenavToggle'],
        }),
        MockComponent({ selector: 'app-sidenav', inputs: ['sidenavOptions'] }),
      ],
    })
      .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
