import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import { Guard } from '../../../../guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  icon: string;
  text: string;
  previousUrl: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setHeader();
  }

  logout() {
    localStorage.removeItem('organizationId');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  setHeader = (): void => {
    const setToDefault = () => {
      this.icon = 'group_work';
      this.text = 'Cerberus';
    };
    this.router.events.subscribe(() => {
      switch (this.router.url) {
        case '/start':
          this.previousUrl = '/login';
          this.icon = 'wb_sunny';
          this.text = 'Getting Started';
          break;
        case '/dashboard':
          setToDefault();
          break;
        case '/checkin':
          this.previousUrl = '/dashboard';
          setToDefault();
          break;
        default:
          setToDefault();
      }
    });
  };

  get showBack() {
    return (this.router.url !== '/login') && (this.router.url !== '/dashboard');
  }

  get showLogout() {
    return !!localStorage.getItem('token');
  }
}
