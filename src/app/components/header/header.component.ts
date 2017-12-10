import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() icon: string;
  @Input() text: string;
  @Input() showBack: boolean;
  @Input() showLogOut: boolean;
  @Output() buttonClick = new EventEmitter<string>();

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
