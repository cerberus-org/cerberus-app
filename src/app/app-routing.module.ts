import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CheckInComponent,
  GettingStartedComponent,
  JoinPageComponent,
  LoginComponent,
  OrganizationDashboardComponent,
  SettingsPageComponent,
} from './containers';
import { LoginGuard } from './login-guard';
import { VerificationGuard } from './verification-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: OrganizationDashboardComponent, canActivate: [LoginGuard] },
  { path: 'checkin/:id', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: 'start', component: GettingStartedComponent },
  { path: 'join', component: JoinPageComponent },
  { path: 'settings', component: SettingsPageComponent, canActivate : [VerificationGuard] },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
