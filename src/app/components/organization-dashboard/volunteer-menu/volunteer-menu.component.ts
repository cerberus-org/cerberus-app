import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Site } from '../../../models/site';
import { SiteService } from '../../../services/site.service';
import { getLocalStorageObjectProperty } from '../../../functions/localStorageObject';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.css']
})
export class VolunteerMenuComponent implements OnInit {

  sites$: Observable<Site[]>;
  error: string;

  constructor(private router: Router,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.sites$ = this.siteService.getByKey(
      'organizationId',
      getLocalStorageObjectProperty('organization', 'id'),
      true);
  }

  onClick(site): void {
    this.router.navigate(['/checkin', site.id]);
  }
}
