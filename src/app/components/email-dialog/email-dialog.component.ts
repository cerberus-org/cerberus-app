import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent implements OnInit {

  email: string;

  constructor(public dialogRef: MatDialogRef<EmailDialogComponent>) { }

  ngOnInit() {}

  /**
   * Close dialog and pass back data.
   */
  confirmSelection() {
    this.dialogRef.close(this.email);
  }
}
