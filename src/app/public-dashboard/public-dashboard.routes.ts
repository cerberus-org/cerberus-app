import { Routes } from '@angular/router';
import { PublicOrganizationDashboardComponent } from './containers/public-organization-dashboard/public-organization-dashboard.component';

export const publicDashboardRoutes: Routes = [
  { path: 'public-dashboard/:name', component: PublicOrganizationDashboardComponent },
];
