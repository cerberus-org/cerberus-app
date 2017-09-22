import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { LocationCheckInComponent } from './location-check-in.component';
import { MockVolunteerService, VolunteerService } from '../../services/volunteer.service';

describe('LocationCheckInComponent', () => {
  let component: LocationCheckInComponent;
  let fixture: ComponentFixture<LocationCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocationCheckInComponent,
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
    fixture = TestBed.createComponent(LocationCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });
});
