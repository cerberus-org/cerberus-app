import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { PublicOrganizationDashboardComponent } from './containers/public-organization-dashboard/public-organization-dashboard.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'public-dashboard/:name', component: PublicOrganizationDashboardComponent },
  { path: 'sign-up', component: SignUpPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {
}
