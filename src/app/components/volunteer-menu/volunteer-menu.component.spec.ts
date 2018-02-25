import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { testSites } from '../../models/site';
import { VolunteerMenuComponent } from './volunteer-menu.component';

describe('VolunteerMenuComponent', () => {
  let component: VolunteerMenuComponent;
  let fixture: ComponentFixture<VolunteerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolunteerMenuComponent
      ],
      imports: [
        MatCardModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a site', () => {
    spyOn(component.siteClick, 'emit');
    component.onClick(testSites[0]);
    expect(component.siteClick.emit).toHaveBeenCalledWith(testSites[0]);
  });
});
