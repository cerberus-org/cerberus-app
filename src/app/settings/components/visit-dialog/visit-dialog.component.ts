import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { formatTimeInputValue } from '../../../shared/helpers';
import { Site } from '../../../shared/models';

@Component({
  selector: 'app-visit-dialog',
  templateUrl: './visit-dialog.component.html',
  styleUrls: ['./visit-dialog.component.scss'],
})
export class VisitDialogComponent implements OnInit {
  endedAt: string;
  selectedSite: Site;
  organizationSites: Site[];

  constructor(public dialogRef: MatDialogRef<VisitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // If data was passed in, set default fields
    this.endedAt = this.data && this.data.endedAt ? formatTimeInputValue(Object.assign({}, this.data.endedAt), Object.assign({}, this.data.endedAt.timezone)) : '';
    this.selectedSite = this.data ? Object.assign({}, this.data.selectedSite) : null;
    this.organizationSites = this.data ? this.data.organizationSites.slice() : [];
  }

  ngOnInit(): void {
  }

  onSelectionChange(siteLabel: string) {
    this.selectedSite.label = siteLabel;
  }

  /**
   * Close dialog and pass back data.
   */
  close() {
    this.data.selectedSite = this.organizationSites.find(site => site.label === this.selectedSite.label);
    this.data.endedAt = this.endedAt;
    // If there was  data passed in this dialog was opened for edit
    this.dialogRef.close(this.data);
  }
}
