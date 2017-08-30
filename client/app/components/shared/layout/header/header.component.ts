import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  icon: string;
  text: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setHeader();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get showBack() {
    return this.router.url === '/checkin';
  }

  get showLogout() {
    return this.router.url !== '/login';
  }

  setHeader = (): void => {
    this.router.events.subscribe(() => {
      switch (this.router.url) {
        case '/start':
          this.icon = 'wb_sunny';
          this.text = 'Getting Started';
          break;
        default:
          this.icon = 'group_work';
          this.text = 'Cerberus';
      }
    });
  }
}
