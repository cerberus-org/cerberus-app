import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationGuard } from '../auth/guards/verification-guard';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';

export const routes: Routes = [
  { path: '', component: SettingsPageComponent, canActivate: [VerificationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
