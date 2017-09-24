import { Component, OnInit } from '@angular/core';

import { VisitService } from '../../services/visit.service';
import { VolunteerService } from '../../services/volunteer.service';
import { OrganizationService } from '../../services/organization.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-check-in',
  templateUrl: './location-check-in.component.html',
  styleUrls: ['./location-check-in.component.css']
})
export class LocationCheckInComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private visitService: VisitService,
    private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.organizationService.getByIdRx(localStorage.getItem('organizationId'));
    const locationId = this.route.snapshot.paramMap.get('id');
    this.visitService.getByLocationRx(locationId);
    this.volunteerService.getByLocationRx(locationId);
  }
}
