import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() icon: string;
  @Input() text: string;
  @Input() showBack: boolean;
  @Input() showLogout: boolean;
  @Output() buttonClick = new EventEmitter<string>();

  constructor() { }

  back(): void {
    this.buttonClick.emit('back');
  }

  settings(): void {
    this.buttonClick.emit('settings');
  }

  logOut(): void {
    this.buttonClick.emit('logOut');
  }
}
