import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './public/public.module#PublicModule',
  },
  {
    path: 'teams',
    loadChildren: './teams/teams.module#TeamsModule',
  },
  {
    path: 'team/:teamId/volunteers',
    loadChildren: './volunteers/volunteers.module#VolunteersModule',
  },
  {
    path: 'team/:teamId/settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },
  { path: '**', redirectTo: 'teams', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
