import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { AppState } from '../../../core/reducers';
import { selectModelSites } from '../../../core/selectors/model.selectors';
import { ColumnOptions, Site } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';
import { SiteDialogComponent } from '../../components/site-dialog/site-dialog.component';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss'],
})
export class SiteSettingsComponent implements OnInit {
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

  constructor(public store$: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sites$ = this.store$.pipe(select(selectModelSites));
  }

  onDeleteSite(site: Site) {
    this.store$.dispatch(Object.assign({}, new SettingsActions.DeleteSite(site)));
  }

  onUpdateSite(site: Site) {
  }

  openSiteDialog() {
    const dialog = this.dialog.open(SiteDialogComponent);
    dialog.afterClosed().subscribe((site: Site) => {
      if (site.label) {
        this.store$.dispatch(Object.assign({}, new SettingsActions.CreateSite(site)));
      }
    });
  }
}
