import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { reducers } from '../../reducers';
import { CheckInComponent } from './component';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInComponent,
        MockComponent({
          selector: 'app-check-in-form',
          inputs: ['organizationId', 'siteId', 'visits', 'volunteers'],
        }),
        MockComponent({
          selector: 'app-new-volunteer-form',
          inputs: ['organizationId', 'changeTab'],
        }),
      ],
      imports: [
        MatTabsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
