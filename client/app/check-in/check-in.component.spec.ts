import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckInComponent } from './check-in.component';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { VolunteerService } from '../shared/volunteer.service';
import { Observable } from 'rxjs/Observable';
import Volunteer from '../shared/volunteer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInComponent],
      imports: [
        MdAutocompleteModule,
        MdInputModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: VolunteerService, useClass: MockVolunteerService }]
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

class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null);
  }

  getVolunteers(): Observable<Volunteer[]> {
    return Observable.of([{
      firstName: 'Ted',
      lastName: 'Mader',
      petName: 'Mimi'
    }, {
      firstName: 'Hillary',
      lastName: 'Arurang',
      petName: 'Bandit'
    }]);
  }

  postVolunteer(volunteer): Observable<Volunteer> {
    return Observable.of({
      firstName: 'Ted',
      lastName: 'Mader',
      petName: 'Mimi'
    })
  }
}
