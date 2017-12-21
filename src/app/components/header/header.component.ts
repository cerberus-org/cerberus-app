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

  onMenu(): void {
    this.buttonClick.emit('menu');
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
}
