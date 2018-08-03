import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { formatTimeInputValue, getIndex, updateDateWithTimeInput } from '../../../shared/helpers';
import { Site } from '../../../shared/models';
import { VisitWithVolunteer } from '../../../shared/models/visit-with-volunteer';

@Component({
  selector: 'app-visit-dialog',
  templateUrl: './visit-dialog.component.html',
  styleUrls: ['./visit-dialog.component.scss'],
})
export class VisitDialogComponent implements OnInit {
  endedAt: string;
  selectedSite: Site;
  organizationSites: Site[];
  color: string;
  bold: string;

  constructor(public dialogRef: MatDialogRef<VisitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // If data was passed in, set default fields
    this.endedAt = this.data && this.data.endedAt ? formatTimeInputValue(Object.assign({}, this.data.endedAt), this.data.endedAt.timezone) : '';
    this.selectedSite = this.data ? Object.assign({}, this.data.selectedSite) : null;
    this.organizationSites = this.data ? this.data.organizationSites.slice() : [];
  }

  ngOnInit(): void {
  }

  onSelectionChange(siteLabel: string): void {
    this.selectedSite.label = siteLabel;
  }

  onTimeChange(event, endedAt): void {
    if (event && event.target && event.target.value && event.target.value !== endedAt) {
      this.bold = 'bold';
      const updatedVisit = this.updateVisitEndedAtWithTime(event.target.value, this.data);
      if (this.isVisitValid(updatedVisit)) {
        this.data.endedAt = updatedVisit;
        this.color = '';
      } else {
        this.color = '#f44336';
      }
    }
  }


  /**
   * Update visit end date with provided time.
   *
   * @param time
   * @param visit
   * @returns {VisitWithVolunteer}
   */
  updateVisitEndedAtWithTime(time: string, visit: VisitWithVolunteer): VisitWithVolunteer {
    const visitCopy = Object.assign({}, visit);
    // If endedAt is null, set to startedAt so we can call setHours on a defined value
    visitCopy.endedAt = updateDateWithTimeInput(time, visitCopy.endedAt ? visitCopy.endedAt : new Date(visitCopy.startedAt), visit.timezone);
    return visitCopy;
  }

  /**
   * Return true if visit startedAt is before visit endedAt.
   *
   * @param visit
   * @returns {boolean}
   */
  isVisitValid(visit: VisitWithVolunteer): boolean {
    return new Date(visit.startedAt) < new Date(visit.endedAt);
  }

  /**
   * Close dialog and pass back data.
   */
  close() {
    this.data.selectedSite = this.organizationSites.find(site => site.label === this.selectedSite.label);
    // If there was  data passed in this dialog was opened for edit
    this.dialogRef.close(this.data);
  }
}
