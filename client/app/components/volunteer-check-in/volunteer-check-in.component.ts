import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-volunteer-check-in',
  templateUrl: './volunteer-check-in.component.html',
  styleUrls: ['./volunteer-check-in.component.css']
})
export class VolunteerCheckInComponent implements OnInit {
  locationId: string;

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.getVolunteers();
    console.log(this.locationId);
  }

  /**
   * Gets volunteers from the data service.
   */
  getVolunteers(): void {
    this.volunteerService.getAllRx();
  }
}
