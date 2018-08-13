import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { SetHeaderOptions } from '../../../core/actions/layout.actions';
import { Go } from '../../../core/actions/router.actions';
import { LoadTeams } from '../../../core/actions/teams.actions';
import { AppState } from '../../../core/reducers';
import { Team } from '../../../shared/models';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="grid grid--center grid--row-gap">
      <mat-card>
        <mat-tab-group mat-stretch-tabs>
          <mat-tab label="Login">
            <app-login></app-login>
          </mat-tab>
          <mat-tab label="View Activity">
            <div class="grid grid--center">
              <h2>Search for your team to view live activity data.</h2>
              <app-team-search
                [showTitle]="false"
                [showInputIconButton]="true"
                (iconButtonClick)="onInputIconButtonClick(team)"
                (selectTeam)="onValidTeam($event)">
              </app-team-search>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
      <div class="grid grid--center gray">
        <button mat-button (click)="onClickSignUp()">New to Cerberus?</button>
      </div>
    </div>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  team: Team;

  constructor(private dialog: MatDialog, public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new SetHeaderOptions({ headerOptions: null }));
    this.store$.dispatch(new LoadTeams());
  }

  onValidTeam(team: Team): void {
    this.team = team;
  }

  onInputIconButtonClick(team: Team) {
    this.store$.dispatch(new Go({ path: ['view-activity', team.name] }));
  }

  onClickSignUp() {
    this.dialog.open(SignUpDialogComponent);
  }
}
