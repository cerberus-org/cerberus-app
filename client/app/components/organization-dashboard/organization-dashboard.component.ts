import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../../services/location.service';
import { VisitService } from '../../services/visit.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.css']
})
export class OrganizationDashboardComponent implements OnInit {

  constructor(private router: Router,
              private locationService: LocationService,
              private organizationService: OrganizationService,
              private visitService: VisitService) { }

  ngOnInit() {
    this.locationService.getAllRx();
    this.organizationService.getByIdRx(localStorage.getItem('organizationId'));
    this.visitService.getByLastGivenDaysRx(7);
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
