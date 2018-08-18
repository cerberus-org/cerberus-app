import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { ColumnOptions, Site } from '../../../shared/models';
import { CreateSite, DeleteSite, UpdateSite } from '../../actions/settings.actions';
import { SiteDialogComponent } from '../site-dialog/site-dialog.component';

@Component({
  selector: 'app-site-settings',
  template: `
    <mat-toolbar class="data-table-header">
      <button
        mat-button
        class="data-table-header__button"
        color="accent"
        [disabled]="false"
        (click)="openCreateSiteDialog()"
      >
        Create Site
      </button>
    </mat-toolbar>
    <app-data-table
      [data$]="sites$"
      [columnOptions]="columnOptions"
      [showRemove]="true"
      [showEdit]="true"
      (editRow)="onEditRow($event)"
      (removeRow)="onRemoveRow($event)"
    >
    </app-data-table>
  `,
  styleUrls: ['./site-settings.component.scss'],
})
export class SiteSettingsComponent {
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Site) => row.name,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (row: Site) => row.address,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (row: Site) => row.description,
    },
  ];
  public sites$: Observable<Site[]>;

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  onRemoveRow(site: Site): void {
    this.store$.dispatch(new DeleteSite({ site }));
  }

  onEditRow(site: Site): void {
    this.openEditSiteDialog(site);
  }

  /**
   * Open dialog with prepopulated fields.
   *
   * @param site
   */
  openEditSiteDialog(site) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = site;
    const dialog = this.dialog.open(SiteDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe((site: Site) => {
      if (site) {
        this.store$.dispatch(Object.assign({}, new UpdateSite({ site })));
      }
    });
  }

  /**
   * Open dialog with empty fields.
   *
   * @param {Site} site
   */
  openCreateSiteDialog(site?: Site) {
    const dialog = this.dialog.open(SiteDialogComponent);
    dialog.afterClosed().subscribe((site: Site) => {
      if (site && site.name) {
        this.store$.dispatch(Object.assign({}, new CreateSite({ site })));
      }
    });
  }
}
