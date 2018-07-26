import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './public/public.module#PublicModule',
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
