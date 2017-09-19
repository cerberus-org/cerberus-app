import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { VolunteerCheckInComponent } from './volunteer-check-in.component';
import { MockVolunteerService, VolunteerService } from '../../services/volunteer.service';

describe('VolunteerCheckInComponent', () => {
  let component: VolunteerCheckInComponent;
  let fixture: ComponentFixture<VolunteerCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolunteerCheckInComponent,
        MockComponent({ selector: 'app-check-in-form' }),
        MockComponent({ selector: 'app-new-volunteer-form', inputs: ['changeTab'] }),
        MockComponent({ selector: 'app-side-margins' })
      ],
      imports: [
        MdTabsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: VolunteerService, useClass: MockVolunteerService }
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
