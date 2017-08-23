import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerMenuComponent } from './volunteer-menu.component';
import { MdCardModule } from '@angular/material';
import { MockVisitService, VisitService } from '../../../services/visit.service';

describe('VolunteerMenuComponent', () => {
  let component: VolunteerMenuComponent;
  let fixture: ComponentFixture<VolunteerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdCardModule
      ],
      declarations: [
        VolunteerMenuComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
