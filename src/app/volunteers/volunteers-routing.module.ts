import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login-guard';
import { CheckInPageComponent } from './containers/check-in-page/check-in-page.component';
import { OrganizationDashboardPageComponent } from './containers/organization-dashboard-page/organization-dashboard-page.component';

export const routes: Routes = [
  { path: '', component: OrganizationDashboardPageComponent, canActivate: [LoginGuard] },
  { path: ':id/check-in', component: CheckInPageComponent, canActivate: [LoginGuard] },
  { path: ':id/check-out', component: CheckInPageComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteersRoutingModule {
}
