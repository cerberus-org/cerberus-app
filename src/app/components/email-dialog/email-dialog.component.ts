import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmailDialogComponent>) { }

  email: string;

  ngOnInit() {
  }

  /**
   * Close dialog and pass back data.
   */
  confirmSelection() {
    this.dialogRef.close(this.email);
  }
}
