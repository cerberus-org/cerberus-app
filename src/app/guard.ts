import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getLocalStorageObject, getLocalStorageObjectProperty } from './functions/localStorageObject';

@Injectable()
export class Guard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {
    if (!getLocalStorageObject('user.id')) {
      this.router.navigateByUrl('/login');
    }
    return !!getLocalStorageObjectProperty('user', 'id');
  }
}
