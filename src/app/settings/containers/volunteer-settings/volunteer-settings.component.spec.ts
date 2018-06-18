import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSettingsComponent } from './volunteer-settings.component';

describe('VolunteerSettingsComponent', () => {
  let component: VolunteerSettingsComponent;
  let fixture: ComponentFixture<VolunteerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
