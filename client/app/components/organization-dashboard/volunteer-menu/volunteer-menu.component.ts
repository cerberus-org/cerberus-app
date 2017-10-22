import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Site } from '../../../models/site';
import { SiteService } from '../../../services/site.service';

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
    this.sites$ = this.siteService
      .getByOrganizationId(localStorage.getItem('organizationId'));
  }

  onClick(site): void {
    this.router.navigate(['/checkin', site._id]);
  }
}
