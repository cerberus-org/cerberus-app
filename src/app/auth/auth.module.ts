import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { LoginGuard } from './guards/login-guard';
import { VerificationGuard } from './guards/verification-guard';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
    CommonModule,
    // Cerberus modules
    DataModule,
    SharedModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    LoginGuard,
    VerificationGuard,
  ],
})
export class AuthModule {
}
