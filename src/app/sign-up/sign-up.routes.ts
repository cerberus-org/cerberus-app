import { Routes } from '@angular/router';
import { GettingStartedComponent } from './containers/getting-started/getting-started.component';
import { JoinPageComponent } from './containers/join-page/join-page.component';

export const signUpRoutes: Routes = [
  { path: 'start', component: GettingStartedComponent },
  { path: 'join', component: JoinPageComponent },
];
