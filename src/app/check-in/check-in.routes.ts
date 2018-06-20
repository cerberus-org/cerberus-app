import { Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login-guard';
import { CheckInComponent } from './containers/check-in/check-in.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';

export const checkInRoutes: Routes = [
  { path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [LoginGuard] },
  { path: 'checkin/:id', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: 'checkout/:id', component: CheckInComponent, canActivate: [LoginGuard] },
];
