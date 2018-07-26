import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
