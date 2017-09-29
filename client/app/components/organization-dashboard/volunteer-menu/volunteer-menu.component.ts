import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Location } from '../../../models/location'
import { LocationService } from '../../../services/location.service';
import { State } from '../../../reducers/index';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.css']
})
export class VolunteerMenuComponent implements OnInit {
  locations: Location[];
  error: string;

  constructor(private router: Router, private store: Store<State>, private locationService: LocationService) { }

  ngOnInit() {
    this.subscribeToLocations();
  }

  /**
   * Subscribes locations in the store.
   */
  subscribeToLocations(): void {
    this.store.select('locations').subscribe(
      state => this.locations = state.locations,
      error => this.error = <any>error);
  }

  onClick(location): void {
    this.router.navigate(['/checkin', location._id]);
  }
}
