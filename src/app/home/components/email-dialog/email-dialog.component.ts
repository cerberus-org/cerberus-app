import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PasswordDialogComponent } from '../../../shared/components/password-dialog/password-dialog.component';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent implements OnInit {

  email: string;

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) { }

  ngOnInit() {}

  /**
   * Close dialog and pass back data.
   */
  confirmSelection() {
    this.dialogRef.close(this.email);
  }
}
