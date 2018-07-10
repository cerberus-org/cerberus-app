import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {

  constructor(
    private snackbarService: SnackBarService,
    private swUpdate: SwUpdate,
  ) {
    this.swUpdate.available.subscribe(() => {
      this.snackbarService.updateAvailable()
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });
  }
}
