import { Routes } from '@angular/router';

import { CheckInComponent } from '../check-in/containers/check-in/check-in.component';
import { OrganizationDashboardComponent } from '../check-in/containers/organization-dashboard/organization-dashboard.component';
import { HomeComponent } from '../home/containers/home/home.component';
import { PublicOrganizationDashboardComponent } from '../public-dashboard/containers/public-organization-dashboard/public-organization-dashboard.component';
import { SettingsPageComponent } from '../settings/containers/settings-page/settings-page.component';
import { GettingStartedComponent } from '../sign-up/containers/getting-started/getting-started.component';
import { JoinPageComponent } from '../sign-up/containers/join-page/join-page.component';
import { LoginGuard } from './guards/login-guard';
import { VerificationGuard } from './guards/verification-guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [LoginGuard] },
  { path: 'checkin/:id', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: 'checkout/:id', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: 'start', component: GettingStartedComponent },
  { path: 'join', component: JoinPageComponent },
  { path: 'settings', component: SettingsPageComponent, canActivate: [VerificationGuard] },
  { path: 'public-dashboard/:name', component: PublicOrganizationDashboardComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
