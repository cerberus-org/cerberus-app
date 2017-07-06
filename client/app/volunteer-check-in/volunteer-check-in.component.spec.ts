import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerCheckInComponent } from './volunteer-check-in.component';

describe('VolunteerCheckInComponent', () => {
  let component: VolunteerCheckInComponent;
  let fixture: ComponentFixture<VolunteerCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerCheckInComponent ]
    })
    .compileComponents();
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
