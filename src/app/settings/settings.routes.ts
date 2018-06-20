import { Routes } from '@angular/router';
import { VerificationGuard } from '../auth/guards/verification-guard';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';

export const settingsRoutes: Routes = [
  { path: 'settings', component: SettingsPageComponent, canActivate: [VerificationGuard] },
];
