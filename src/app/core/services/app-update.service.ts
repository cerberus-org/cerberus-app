import { Injectable, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService implements OnDestroy {
  availableUpdateSubscription: Subscription;

  constructor(
    private snackbarService: SnackBarService,
    private swUpdate: SwUpdate,
  ) {
    this.availableUpdateSubscription = this.subscribeToAvailableUpdate();
  }

  ngOnDestroy() {
    this.availableUpdateSubscription.unsubscribe();
  }

  subscribeToAvailableUpdate(): Subscription {
    return this.swUpdate.available.subscribe(() => {
      this.snackbarService.updateAvailable()
        .onAction()
        .subscribe(() => {
          this.reload();
        });
    });
  }

  reload(): void {
    window.location.reload();
  }
}
