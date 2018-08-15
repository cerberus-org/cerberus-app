import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { formatTimeInputValue, updateDateWithTimeInput } from '../../../shared/helpers';
import { Site, Visit } from '../../../shared/models';
import { UpdateVisit } from '../../actions/settings.actions';
import { VisitWithData } from '../../models/visit-with-data';

@Component({
  selector: 'app-visit-dialog',
  template: `
    <mat-dialog-content class="container">
      <h2 md-dialog-title>Edit Visit</h2>
      <!--endedAt-->
      <mat-form-field class="example-full-width" autocomplete="off">
        <mat-label>Checkout time</mat-label>
        <input
          matInput
          type="time"
          [value]="endedAt"
          [ngStyle]="{'color': color, 'font-weight': bold}"
          (click)="onTimeChange($event)"
        >
      </mat-form-field>
      <!--site-->
      <mat-form-field class="example-full-width" autocomplete="off">
        <mat-select
          placeholder="Site"
          [value]="visitWithData.site || selectedSite"
          (selectionChange)="onSelectionChange($event.value)">
          <mat-option *ngFor="let site of (sites$ | async)" [value]="site">
            {{site.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">
        Cancel
      </button>
      <button mat-button (click)="submit()" color="primary" [disabled]="color === '#f44336'">
        Submit
      </button>
    </div>
  `,
  styleUrls: ['./edit-visit-dialog.component.scss'],
})
export class EditVisitDialogComponent {
  endedAt: string;
  selectedSite: Site;
  sites$: Observable<Site[]>;
  color: string;
  bold: string;

  constructor(
    private store$: Store<AppState>,
    public dialogRef: MatDialogRef<EditVisitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public visitWithData: VisitWithData,
  ) {
    // If data was passed in, set default fields
    this.endedAt = this.visitWithData && this.visitWithData.endedAt ? formatTimeInputValue(this.visitWithData.endedAt, this.visitWithData.timezone) : '';
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  onSelectionChange(site: Site): void {
    this.selectedSite = site;
  }

  onTimeChange(event): void {
    if (event && event.target && event.target.value) {
      this.bold = 'bold';
      const updatedVisit = this.updateVisitEndedAtWithTime(event.target.value, this.visitWithData);
      if (this.isVisitValid(updatedVisit)) {
        this.visitWithData.endedAt = updatedVisit.endedAt;
        this.color = '';
      } else {
        this.color = '#f44336';
      }
    }
  }

  /**
   * Update visit end date with provided time.
   *
   * @param time
   * @param visit
   * @returns {VisitWithData}
   */
  updateVisitEndedAtWithTime(time: string, visit: VisitWithData): VisitWithData {
    const visitCopy = Object.assign({}, visit);
    // Use same day as startedAt
    visitCopy.endedAt = updateDateWithTimeInput(time, new Date(visitCopy.startedAt), visit.timezone);
    return visitCopy;
  }

  /**
   * Return true if visit startedAt is before visit endedAt.
   *
   * @param visit
   * @returns {boolean}
   */
  isVisitValid(visit: VisitWithData): boolean {
    return new Date(visit.startedAt) < new Date(visit.endedAt);
  }

  close(): void {
    this.dialogRef.close();
  }

  /**
   * Close dialog and pass back data.
   */
  submit(): void {
    const visitClone = Object.assign({}, this.visitWithData);
    delete visitClone.volunteer;
    delete visitClone.site;
    this.store$.dispatch(new UpdateVisit({
      visit: {
        ...visitClone as Visit,
        ...(!!this.selectedSite && { siteId: this.selectedSite.id }),
      },
    }));
    this.close();
  }
}
