import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Site } from '../../../shared/models';

@Component({
  selector: 'app-visit-dialog',
  templateUrl: './visit-dialog.component.html',
  styleUrls: ['./visit-dialog.component.scss'],
})
export class VisitDialogComponent implements OnInit {
  endTime: string;
  selectedSite: Site;
  organizationSites: Site[];

  constructor(public dialogRef: MatDialogRef<VisitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // If data was passed in, set default fields
    this.endTime = this.data ? this.data.endTime : '';
    this.selectedSite = this.data ? this.data.selectedSite : null;
    this.organizationSites = this.data ? this.data.organizationSites : [];
  }

  ngOnInit(): void {
  }

  onSelectionChange(value) {

  }

  /**
   * Close dialog and pass back data.
   */
  close() {
    // If there was  data passed in this dialog was opened for edit
    this.dialogRef.close();
  }
}
