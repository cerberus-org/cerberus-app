import { Routes } from '@angular/router';
import { HomeComponent } from '../home/containers/home/home.component';
import { PublicOrganizationDashboardComponent } from '../public-dashboard/containers/public-organization-dashboard/public-organization-dashboard.component';
import { SettingsPageComponent } from '../settings/containers/settings-page/settings-page.component';
import { GettingStartedComponent } from '../sign-up/containers/getting-started/getting-started.component';
import { JoinPageComponent } from '../sign-up/containers/join-page/join-page.component';
import { VerificationGuard } from './guards/verification-guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'start', component: GettingStartedComponent },
  { path: 'join', component: JoinPageComponent },
  { path: 'settings', component: SettingsPageComponent, canActivate: [VerificationGuard] },
  { path: 'public-dashboard/:name', component: PublicOrganizationDashboardComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
