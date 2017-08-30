import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDashboardComponent } from './components/organization-dashboard/organization-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Guard } from './guard';
import { VolunteerCheckInComponent } from './components/volunteer-check-in/volunteer-check-in.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: OrganizationDashboardComponent, canActivate : [Guard] },
  { path: 'checkin', component: VolunteerCheckInComponent, canActivate : [Guard] },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
