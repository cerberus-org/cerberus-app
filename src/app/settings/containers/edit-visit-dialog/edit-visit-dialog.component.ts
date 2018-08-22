import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { formatTimeInputValue, updateDateWithTimeInput } from '../../../shared/helpers';
import { Site, Visit } from '../../../shared/models';
import { UpdateVisit } from '../../actions/settings.actions';
import { VisitTableRow } from '../../models/visit-table-row';

@Component({
  selector: 'app-visit-dialog',
  template: `
    <h2 mat-dialog-title>Edit Visit</h2>
    <mat-dialog-content>
      <div class="form-container">
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
        <mat-form-field class="example-full-width" autocomplete="off">
          <mat-select
            placeholder="Site"
            [value]="dialogData.site || selectedSite"
            (selectionChange)="onSelectionChange($event.value)"
          >
            <mat-option *ngFor="let site of (sites$ | async)" [value]="site">
              {{site.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary" [disabled]="color === '#f44336'" (click)="submit()">
        Submit
      </button>
      <button mat-button mat-dialog-close color="primary">Cancel</button>
    </mat-dialog-actions>
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
    @Inject(MAT_DIALOG_DATA) public dialogData: VisitTableRow,
  ) {
    // If data was passed in, set default fields
    this.endedAt = this.dialogData && this.dialogData.endedAt
      ? formatTimeInputValue(this.dialogData.endedAt, this.dialogData.timezone)
      : '';
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  onSelectionChange(site: Site): void {
    this.selectedSite = site;
  }

  onTimeChange(event): void {
    if (event && event.target && event.target.value) {
      this.bold = 'bold';
      const updatedVisit = this.updateVisitEndedAtWithTime(event.target.value, this.dialogData);
      if (this.isVisitValid(updatedVisit)) {
        this.dialogData.endedAt = updatedVisit.endedAt;
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
   * @returns {VisitTableRow}
   */
  updateVisitEndedAtWithTime(time: string, visit: VisitTableRow): VisitTableRow {
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
  isVisitValid(visit: VisitTableRow): boolean {
    return new Date(visit.startedAt) < new Date(visit.endedAt);
  }

  /**
   * Close dialog and pass back data.
   */
  submit(): void {
    const visitClone = Object.assign({}, this.dialogData);
    delete visitClone.volunteer;
    delete visitClone.site;
    this.store$.dispatch(new UpdateVisit({
      visit: {
        ...visitClone as Visit,
        ...(!!this.selectedSite && { siteId: this.selectedSite.id }),
      },
    }));
  }
}
