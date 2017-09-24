import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { LocationCheckInComponent } from './location-check-in.component';
import { MockOrganizationService, OrganizationService } from '../../services/organization.service';
import { MockVolunteerService, VolunteerService } from '../../services/volunteer.service';
import { MockVisitService, VisitService } from '../../services/visit.service';
import { RouterTestingModule } from '@angular/router/testing';

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
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: VisitService, useClass: MockVisitService },
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
