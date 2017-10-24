import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class Guard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {
    if (!localStorage.getItem('uid')) {
      this.router.navigateByUrl('/login');
    }
    return !!localStorage.getItem('uid');
  }
}
