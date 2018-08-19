import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings-toolbar',
  template: `
    <mat-toolbar>
      <span>{{title}}</span>
      <span class="spacer"></span>
      <button
        *ngIf="showAdd"
        mat-icon-button
        color="accent"
        [disabled]="false"
        (click)="clickAdd.emit()"
      >
        <i class="material-icons">add</i>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./settings-toolbar.component.scss'],
})
export class SettingsToolbarComponent {
  @Input() title: string;
  @Input() showAdd: boolean;
  @Output() clickAdd = new EventEmitter();
}
