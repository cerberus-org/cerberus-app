import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CanActivate, Router } from '@angular/router';

import { VerificationDialogComponent } from './containers/verification-dialog/verification-dialog.component';

@Injectable()
export class VerificationGuard implements CanActivate {

  pwd: string;

  constructor(public router: Router, private dialog: MatDialog) {}

  /**
   * Open the dialog and subscribe to the observable that is returned on closed
   * to extract the data.
   */
  public canActivate() {
    const dialog = this.dialog.open(VerificationDialogComponent);

    dialog.afterClosed()
      .subscribe(val => {
        if (val) {
          this.pwd = val;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
    return true;
  }
}
