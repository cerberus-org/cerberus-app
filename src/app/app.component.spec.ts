import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { reducers } from './reducers/index';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
        MatDialogModule
      ],
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-footer' }),
        MockComponent({ selector: 'app-header', inputs: ['icon', 'text', 'showBack', 'showLogOut'] })
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
