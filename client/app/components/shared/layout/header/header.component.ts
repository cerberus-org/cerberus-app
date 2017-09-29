import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Organization } from '../../../../models/organization';

interface HeaderState {
  organizations: Organization[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  error: string;
  icon: string;
  text: string;
  previousUrl: string;

  constructor(private router: Router, private store: Store<HeaderState>) { }

  ngOnInit() {
    this.setHeader();
    this.subscribeToOrganizations();
  }

  subscribeToOrganizations() {
    this.store.select('organizations').subscribe(organizations => {
        if (organizations.length > 0) {
          this.text = organizations[0].name;
        }
      },
      error => this.error = <any>error);
  }

  onBack(): void {
    this.router.navigateByUrl(this.previousUrl);
  }

  onLogout(): void {
    localStorage.removeItem('organizationId');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  setHeader = (): void => {
    this.router.events.subscribe(() => {
      // Get the string after the first '/'
      switch (this.router.url.split('/')[1]) {
        case 'start':
          this.previousUrl = '/login';
          this.icon = 'wb_sunny';
          this.text = 'Getting Started';
          break;
        case 'dashboard':
          // Text set in subscribeToOrganizations()
          this.icon = 'business';
          break;
        case 'checkin':
          // Text set in subscribeToOrganizations()
          this.previousUrl = '/dashboard';
          this.icon = 'business';
          break;
        default:
          this.icon = 'group_work';
          this.text = 'Cerberus';
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
