import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MdCardModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { VolunteerMenuComponent } from './volunteer-menu.component';
import { LocationService, MockLocationService } from '../../../services/location.service';
import { locationReducer } from '../../../reducers/locations.reducer';

describe('VolunteerMenuComponent', () => {
  let component: VolunteerMenuComponent;
  let fixture: ComponentFixture<VolunteerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolunteerMenuComponent
      ],
      imports: [
        MdCardModule,
        RouterTestingModule,
        StoreModule.provideStore({ locations: locationReducer })
      ],
      providers: [
        { provide: LocationService, useClass: MockLocationService }
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
