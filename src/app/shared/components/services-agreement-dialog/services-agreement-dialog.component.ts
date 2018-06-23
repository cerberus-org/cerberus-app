import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-services-agreement-dialog',
  templateUrl: './services-agreement-dialog.component.html',
  styleUrls: ['./services-agreement-dialog.component.scss'],
})
export class ServicesAgreementDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ServicesAgreementDialogComponent>) { }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
