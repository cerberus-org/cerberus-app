import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Site, Team } from '../../../shared/models';

@Component({
  selector: 'app-selected-team-toolbar',
  template: `
    <div class="container">
      <h1 class="container--header">{{title}}</h1>
      <span class="spacer"></span>
      <div *ngIf="team">
        <mat-form-field class="container--actions">
          <mat-select
            (selectionChange)="onSelectionChange($event.value)"
            placeholder={{placeholder}}
            [value]="selectedSiteName">
            <mat-option *ngFor="let site of sites" [value]="site.name">
              {{site.name}}
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
  @Input() sites: Site[];
  @Output() clickActivate = new EventEmitter<Team>();
  @Output() clickSettings = new EventEmitter<Team>();

  get title(): string {
    return this.team ? this.team.name : 'Please select a team.';
  }

  get placeholder(): string {
    return localStorage.getItem(this.team.id) !== null ? '' : 'Select site';
  }

  get selectedSiteName(): string {
    const siteId = localStorage.getItem(this.team.id);
    const site = this.sites.find((site: Site) => site.id === siteId);
    return site && site.name ? site.name : null;
  }

  onSelectionChange(siteName: string): void {
    localStorage.setItem(this.team.id, this.sites.find((site: Site) => site.name === siteName).id);
  }
}
