import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsVolunteerComponent } from './is-volunteer.component';

describe('IsVolunteerComponent', () => {
  let component: IsVolunteerComponent;
  let fixture: ComponentFixture<IsVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
