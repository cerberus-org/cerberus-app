import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { homeRoutes } from './home.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule.forChild(homeRoutes),
    // Cerberus modules
    SharedModule,
  ],
  declarations: [
    EmailDialogComponent,
    HomeComponent,
    LoginComponent,
  ],
  exports: [
    HomeComponent,
  ],
  entryComponents: [
    EmailDialogComponent,
  ],
})
export class HomeModule {
}
