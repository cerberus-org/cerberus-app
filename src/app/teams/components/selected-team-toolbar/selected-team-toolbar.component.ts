import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Organization } from '../../../shared/models';

@Component({
  selector: 'app-selected-team-toolbar',
  template: `
    <mat-toolbar>
      <h1>{{title}}</h1>
      <span class="spacer"></span>
      <div *ngIf="team">
        <button mat-button color="primary" (click)="clickActivate.emit(team)">Go to Check-in</button>
        <button mat-icon-button color="accent" (click)="clickSettings.emit(team)">
          <i class="material-icons">settings</i>
        </button>
      </div>
    </mat-toolbar>
    <mat-divider></mat-divider>
  `,
  styleUrls: ['./selected-team-toolbar.component.scss'],
})
export class SelectedTeamToolbarComponent {
  @Input() team: Organization;
  @Output() clickActivate = new EventEmitter<Organization>();
  @Output() clickSettings = new EventEmitter<Organization>();

  get title(): string {
    return this.team ? this.team.name : 'Please select a team.';
  }
}
