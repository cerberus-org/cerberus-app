import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckInComponent } from './check-in/check-in.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'checkin', component: CheckInComponent },
  { path: '**', redirectTo: 'checkin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
