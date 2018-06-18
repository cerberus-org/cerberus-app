import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CheckInComponent,
  GettingStartedComponent,
  HomeComponent,
  JoinPageComponent,
  OrganizationDashboardComponent,
  PublicOrganizationDashboardComponent,
  SettingsPageComponent,
} from './containers';
import { LoginGuard } from './login-guard';
import { VerificationGuard } from './verification-guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [LoginGuard] },
  { path: 'checkin/:id', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: 'checkout/:id', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: 'start', component: GettingStartedComponent },
  { path: 'join', component: JoinPageComponent },
  // { path: 'settings', component: SettingsPageComponent, canActivate: [VerificationGuard] },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'public-dashboard/:name', component: PublicOrganizationDashboardComponent },
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'settings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
