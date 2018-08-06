import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as LayoutActions from '../../../core/actions/layout.actions';
import * as ModelActions from '../../../core/actions/model.actions';
import * as RouterActions from '../../../core/actions/router.actions';
import { AppState } from '../../../core/reducers';
import { Organization } from '../../../shared/models';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container-center header-spacing">
      <mat-card>
        <mat-tab-group>
          <mat-tab label="Login">
            <app-login></app-login>
          </mat-tab>
          <mat-tab label="View Activity">
            <div class="container-center loose">
              <h2>Search for your organization to view live activity data.</h2>
              <div class="container-inline loose">
                <app-team-search
                  [showTitle]="false"
                  [showInputIconButton]="true"
                  (iconButtonClick)="onInputIconButtonClick(organization)"
                  (selectTeam)="onValidOrganization($event)">
                </app-team-search>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>
    <div class="container-center loose container-inline home-buttons">
      <button mat-button (click)="onClickSignUp()">New to Cerberus?</button>
    </div>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  organization: Organization;

  constructor(private dialog: MatDialog, public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(null));
    this.store$.dispatch(new ModelActions.LoadOrganizations());
  }

  onValidOrganization(organization: Organization): void {
    this.organization = organization;
  }

  onInputIconButtonClick(organization: Organization) {
    this.store$.dispatch(new RouterActions.Go({ path: ['view-activity/' + organization.name] }));
  }

  onClickSignUp() {
    this.dialog.open(SignUpDialogComponent);
  }
}
