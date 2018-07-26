import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { PublicOrganizationDashboardComponent } from './containers/public-organization-dashboard/public-organization-dashboard.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'public-dashboard/:name', component: PublicOrganizationDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {
}
