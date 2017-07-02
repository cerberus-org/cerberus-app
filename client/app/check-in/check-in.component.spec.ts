import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckInComponent } from './check-in.component';
import { MockVolunteerService, VolunteerService } from '../shared/volunteer.service';

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
