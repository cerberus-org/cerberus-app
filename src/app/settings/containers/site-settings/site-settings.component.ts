import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { ColumnOptions, Site } from '../../../shared/models';
import { CreateSite, DeleteSite, UpdateSite } from '../../actions/settings.actions';
import { SiteDialogComponent } from '../../components/site-dialog/site-dialog.component';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss'],
})
export class SiteSettingsComponent {
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'label',
      header: 'Label',
      cell: (row: Site) => row.name,
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

  onDeleteSite(site: Site): void {
    this.store$.dispatch(new DeleteSite({ site }));
  }

  onEditSite(site: Site): void {
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
