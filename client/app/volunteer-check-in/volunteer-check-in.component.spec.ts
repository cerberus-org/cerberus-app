import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerCheckInComponent } from './volunteer-check-in.component';
import { MockComponent } from 'ng2-mock-component';
import { MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VolunteerCheckInComponent', () => {
  let component: VolunteerCheckInComponent;
  let fixture: ComponentFixture<VolunteerCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolunteerCheckInComponent,
        MockComponent({ selector: 'app-check-in-form' }),
        MockComponent({ selector: 'app-new-volunteer-form' })
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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
