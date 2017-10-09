import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { CheckInComponent } from './check-in.component';
import { MockOrganizationService, OrganizationService } from '../../services/organization.service';
import { MockVolunteerService, VolunteerService } from '../../services/volunteer.service';
import { MockVisitService, VisitService } from '../../services/visit.service';
import { RouterTestingModule } from '@angular/router/testing';

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
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });
});
