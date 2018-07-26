import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login-guard';
import { CheckInComponent } from './containers/check-in/check-in.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';

export const routes: Routes = [
  { path: '', component: OrganizationDashboardComponent, canActivate: [LoginGuard] },
  { path: ':id/check-in', component: CheckInComponent, canActivate: [LoginGuard] },
  { path: ':id/check-out', component: CheckInComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteersRoutingModule {
}
