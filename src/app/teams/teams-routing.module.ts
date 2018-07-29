import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login-guard';
import { TeamsPageComponent } from './containers/teams-page/teams-page.component';

export const routes: Routes = [
  { path: '', component: TeamsPageComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {
}
