import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Site } from '../../../models/site'
import { SiteService } from '../../../services/site.service';
import { State } from '../../../reducers/index';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.css']
})
export class VolunteerMenuComponent implements OnInit {
  sites: Site[];
  error: string;

  constructor(private router: Router, private store: Store<State>, private siteService: SiteService) { }

  ngOnInit() {
    this.subscribeToSites();
  }

  /**
   * Subscribes sites in the store.
   */
  subscribeToSites(): void {
    this.store.select('sites').subscribe(
      state => this.sites = state.sites,
      error => this.error = <any>error);
  }

  onClick(site): void {
    this.router.navigate(['/checkin', site._id]);
  }
}
