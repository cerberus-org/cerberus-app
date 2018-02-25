import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HeaderOptions } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() headerOptions: HeaderOptions;
  @Input() showLogOut: boolean;
  @Input() showSidenavToggle: boolean;
  @Output() buttonClick = new EventEmitter<string>();

  onSidenavToggle(): void {
    this.buttonClick.emit('sidenav_toggle');
  }

  onBack(): void {
    this.buttonClick.emit('back');
  }

  onSettings(): void {
    this.buttonClick.emit('settings');
  }

  onLogOut(): void {
    this.buttonClick.emit('logOut');
  }

  get title(): string {
    return this.headerOptions ? this.headerOptions.title : 'Loading...';
  }

  get icon(): string {
    return this.headerOptions ? this.headerOptions.icon : '';
  }

  get showBack(): boolean {
    return this.headerOptions && !!this.headerOptions.previousUrl;
  }

  get showSettings(): boolean {
    return this.headerOptions && this.headerOptions.showSettings;
  }
}
