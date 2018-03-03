import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
})
export class ResetPasswordDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResetPasswordDialogComponent>) { }

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
