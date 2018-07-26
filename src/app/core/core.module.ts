import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import 'hammerjs';
import { HeaderComponent } from './containers/header/header.component';
import { AppComponent } from './containers/root/app.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  SidenavComponent,
];

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    // Cerberus Modules
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
}
