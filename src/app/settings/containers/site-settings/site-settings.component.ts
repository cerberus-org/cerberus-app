import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { ColumnOptions, Site } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';
import { SiteDialogComponent } from '../../components/site-dialog/site-dialog.component';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss'],
})
export class SiteSettingsComponent {
  columnOptions: ColumnOptions[] = [
    new ColumnOptions(
      'label',
      'Label',
      (row: Site) => row.label,
    ),
    new ColumnOptions(
      'description',
      'Description',
      (row: Site) => row.description,
    ),
  ];
  public sites$: Observable<Site[]>;

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  onDeleteSite(site: Site): void {
    this.store$.dispatch(new SettingsActions.DeleteSite(site));
  }

  onEditSite(site: Site): void {
    this.openDialogForEdit(site);
  }

  onUpdateSite(site: Site): void {
  }

  /**
   * Open dialog with prepopulated fields.
   *
   * @param site
   */
  openDialogForEdit(site) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = site;
    const dialog = this.dialog.open(SiteDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe((siteOnClose: Site) => {
      if (siteOnClose) {
        this.store$.dispatch(Object.assign({}, new SettingsActions.UpdateSite(siteOnClose)));
      }
    });
  }

  /**
   * Open dialog with empty fields.
   *
   * @param {Site} site
   */
  openDialogForCreation(site?: Site) {
    const dialog = this.dialog.open(SiteDialogComponent);
    dialog.afterClosed().subscribe((site: Site) => {
      if (site && site.label) {
        this.store$.dispatch(Object.assign({}, new SettingsActions.CreateSite(site)));
      }
    });
  }
}
