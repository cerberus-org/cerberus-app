import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.css']
})
export class VolunteerMenuComponent implements OnInit {
  locations: Location[];
  error: string;

  constructor(private router: Router, private store: Store<Location>, private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getAllRx();
    this.subscribeToLocations();
  }

  /**
   * Subscribes locations in the store.
   */
  subscribeToLocations(): void {
    this.store.select<Location[]>('locations').subscribe(
      locations => this.locations = locations,
      error => this.error = <any>error);
  }

  onClick(location): void {
    this.router.navigate(['/checkin', location._id]);
  }
}
