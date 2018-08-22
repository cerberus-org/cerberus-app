import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadUsers, LoadUsersByIds, UsersActionTypes } from '../actions/users.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UsersEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions.pipe(
    ofType<LoadUsers>(UsersActionTypes.LoadUsers),
    switchMap(() => this.userService.getAllChanges()),
  );

  @Effect()
  loadUsersByIds$: Observable<Action> = this.actions.pipe(
    ofType<LoadUsersByIds>(UsersActionTypes.LoadUsersByIds),
    map(action => action.payload.ids),
    switchMap(ids => this.userService.getChangesByIds(ids)),
  );
}
