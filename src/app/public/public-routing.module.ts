import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { ViewActivityPageComponent } from './containers/view-activity-page/view-activity-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'view-activity/:name', component: ViewActivityPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {
}
