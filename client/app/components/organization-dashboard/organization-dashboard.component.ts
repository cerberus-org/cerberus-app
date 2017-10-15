import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SiteService } from '../../services/site.service';
import { VisitService } from '../../services/visit.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.css']
})
export class OrganizationDashboardComponent implements OnInit {

  constructor(private router: Router,
              private siteService: SiteService,
              private organizationService: OrganizationService) { }

  ngOnInit() {
    const organizationId = localStorage.getItem('organizationId');
    this.organizationService.getByIdRx(organizationId);
    this.siteService.getByOrganizationRx(organizationId);
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
