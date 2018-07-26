import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './public/public.module#PublicModule',
  },
  {
    path: 'organization/volunteers',
    loadChildren: './volunteers/volunteers.module#VolunteersModule',
  },
  {
    path: 'organization/settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },
  { path: '**', redirectTo: 'organization/volunteers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
