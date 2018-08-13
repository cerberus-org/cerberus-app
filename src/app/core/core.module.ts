import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from './containers/app/app.component';
import { HeaderComponent } from './containers/header/header.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  SidenavComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
  ],
  declarations: COMPONENTS,
  exports:
  COMPONENTS,
})

export class CoreModule {}
