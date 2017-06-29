import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckInComponent } from './check-in/check-in.component';

const routes: Routes = [
  {
  path: '',
  redirectTo: "/check-in",
  pathMatch: 'full'
  },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'check-in', component: CheckInComponent},
  {
    path: '',
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
