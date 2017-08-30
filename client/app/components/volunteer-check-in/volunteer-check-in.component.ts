import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'app-volunteer-check-in',
  templateUrl: './volunteer-check-in.component.html',
  styleUrls: ['./volunteer-check-in.component.css']
})
export class VolunteerCheckInComponent implements OnInit {

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.getVolunteers();
  }

  /**
   * Gets volunteers from the data service.
   */
  getVolunteers(): void {
    this.volunteerService.getAllRx();
  }
}
