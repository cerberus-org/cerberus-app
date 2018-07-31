import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Organization } from '../../../shared/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-team-card',
  template: `
    <div>
      <mat-card>
        <mat-card-title>{{team.name}}</mat-card-title>
        <mat-card-subtitle>{{team.description}}</mat-card-subtitle>
        <mat-divider></mat-divider>
        <mat-card-actions>
          <div class="grid grid--inline">
            <div class="grid__left">
              <button mat-button color="primary" (click)="clickActivate.emit(team)">Activate check-in</button>
            </div>
            <div class="grid__right">
              <button mat-icon-button color="accent" (click)="clickSettings.emit(team)">
                <i class="material-icons">settings</i>
              </button>
            </div>
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() team: Organization;
  @Output() clickActivate = new EventEmitter<Organization>();
  @Output() clickSettings = new EventEmitter<Organization>();
}
