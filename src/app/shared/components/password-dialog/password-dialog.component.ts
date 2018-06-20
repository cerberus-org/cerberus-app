import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent implements OnInit {
  pwd: string;
  hidePwd: boolean;

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) { }

  ngOnInit() {
    this.hidePwd = true;
  }

  /**
   * Close dialog and pass back data.
   */
  close() {
    this.dialogRef.close(this.pwd);
  }
}
