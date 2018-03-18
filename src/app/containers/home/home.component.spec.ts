import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule, MatCardModule, MatIconModule, MatInputModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { reducers } from '../../reducers';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent({ selector: 'app-find-organization' }),
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
});
