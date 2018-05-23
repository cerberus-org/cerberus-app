import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-policy-dialog',
  templateUrl: './policy-dialog.component.html',
  styleUrls: ['./policy-dialog.component.scss'],
})
export class PolicyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) { }

  ngOnInit() {}

  confirmSelection() {
    this.dialogRef.close();
  }

}
