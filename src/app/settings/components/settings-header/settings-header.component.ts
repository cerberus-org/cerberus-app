import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-header',
  template: `
    <mat-toolbar class="data-table-header">
      <span>{{title}}</span>
      <span class="spacer"></span>
      <button
        *ngIf="showAdd"
        mat-icon-button
        class="data-table-header__button"
        color="accent"
        [disabled]="false"
        (click)="clickAdd.emit()"
      >
        <i class="material-icons">add</i>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./settings-header.component.scss'],
})
export class SettingsHeaderComponent {
  @Input() title: string;
  @Input() showAdd: boolean;
  @Output() clickAdd = new EventEmitter();
}
