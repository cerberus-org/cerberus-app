import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDashboardComponent } from './components/organization-dashboard/organization-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Guard } from './guard';
import { CheckInComponent } from './components/check-in/check-in.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: OrganizationDashboardComponent, canActivate : [Guard] },
  { path: 'checkin/:id', component: CheckInComponent, canActivate : [Guard] },
  { path: 'start', component: GettingStartedComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
