import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.css']
})
export class OrganizationDashboardComponent implements OnInit {

  constructor(private router: Router,
              private siteService: SiteService) { }

  ngOnInit() {
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
