import { Component, OnInit } from '@angular/core';

import { VisitService } from '../../services/visit.service';
import { VolunteerService } from '../../services/volunteer.service';
import { OrganizationService } from '../../services/organization.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private visitService: VisitService,
    private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    const organizationId = localStorage.getItem('organizationId');
    this.organizationService.getByIdRx(organizationId);
    this.volunteerService.getByOrganizationRx(organizationId);
    this.visitService.getBySiteRx(this.route.snapshot.paramMap.get('id'));
  }
}
