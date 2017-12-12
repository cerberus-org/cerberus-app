import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable()
export class VerificationGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  public canActivate(): boolean {
    if (this.authService.isPwdValid()) {
      this.authService.setPwdVerification(false);
      return true;
    }
    return false;
  }
}
