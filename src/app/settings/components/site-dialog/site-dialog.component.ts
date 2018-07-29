import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Site } from '../../../shared/models';

@Component({
  selector: 'app-site-dialog',
  templateUrl: './site-dialog.component.html',
  styleUrls: ['./site-dialog.component.scss'],
})
export class SiteDialogComponent implements OnInit {
  label: string;
  description: string;
  address: string;

  constructor(public dialogRef: MatDialogRef<SiteDialogComponent>) { }

  ngOnInit(): void {
    this.label = '';
    this.description = '';
    this.address = '';
  }

  /**
   * Close dialog and pass back data.
   */
  close() {
    this.dialogRef.close(new Site(null, this.label, this.address, this.description));
  }
}
