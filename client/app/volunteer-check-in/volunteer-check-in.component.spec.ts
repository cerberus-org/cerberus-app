import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { VolunteerCheckInComponent } from './volunteer-check-in.component';

describe('VolunteerCheckInComponent', () => {
  let component: VolunteerCheckInComponent;
  let fixture: ComponentFixture<VolunteerCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolunteerCheckInComponent,
        MockComponent({ selector: 'app-check-in-form' }),
        MockComponent({ selector: 'app-new-volunteer-form', inputs: ['changeTab'] })
      ],
      imports: [
        BrowserAnimationsModule,
        MdTabsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });
});
