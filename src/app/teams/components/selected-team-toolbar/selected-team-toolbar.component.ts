import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../../shared/models';

@Component({
  selector: 'app-selected-team-toolbar',
  template: `
    <div class="container">
      <h1 class="container--header">{{title}}</h1>
      <span class="spacer"></span>
      <div *ngIf="team">
        <mat-form-field class="container--actions">
          <mat-select>
            <mat-option *ngFor="let food of foods" [value]="food.value">
              {{food.viewValue}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button class="container--actions" color="primary" (click)="clickActivate.emit(team)">Go to Check-in</button>
        <button mat-icon-button class="container--actions" color="accent" (click)="clickSettings.emit(team)">
          <i class="material-icons">settings</i>
        </button>
      </div>
    </div>
    <mat-divider></mat-divider>
  `,
  styleUrls: ['./selected-team-toolbar.component.scss'],
})
export class SelectedTeamToolbarComponent {
  @Input() team: Team;
  @Output() clickActivate = new EventEmitter<Team>();
  @Output() clickSettings = new EventEmitter<Team>();

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  get title(): string {
    return this.team ? this.team.name : 'Please select a team.';
  }
}
