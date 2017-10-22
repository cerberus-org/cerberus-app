import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { CheckInComponent } from './check-in.component';
import { reducers } from '../../reducers/index';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInComponent,
        MockComponent({ selector: 'app-check-in-form' }),
        MockComponent({ selector: 'app-new-volunteer-form', inputs: ['changeTab'] }),
        MockComponent({ selector: 'app-side-margins' })
      ],
      imports: [
        MatTabsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });
});
