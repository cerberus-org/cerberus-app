import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { authEffects } from './effects';
import { LoginGuard } from './guards/login-guard';
import { VerificationGuard } from './guards/verification-guard';
import { authReducers } from './reducers';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    LoginGuard,
    VerificationGuard,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, LoginGuard, VerificationGuard],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature(authEffects),
  ],
})
export class RootAuthModule {}
