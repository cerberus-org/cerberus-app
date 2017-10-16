import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { OrganizationService } from '../../../../services/organization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  organizationSubscription: Subscription;
  routerEventsSubscription: Subscription;
  icon: string;
  text: string;
  previousUrl: string;

  constructor(private router: Router,
              private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationSubscription = this.organizationService
      .getById(localStorage.getItem('organizationId'))
      .subscribe(state => {
        if (state.organizations.length > 0) {
          this.text = state.organizations[0].name;
        }
      });
    this.routerEventsSubscription = this.subscribeToRouterEvents();
  }

  ngOnDestroy() {
    this.organizationSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
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

  subscribeToRouterEvents(): Subscription {
    return this.router.events.subscribe(() => {
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
