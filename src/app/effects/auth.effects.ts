import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { OrganizationService, UserService } from '../services';

@Injectable()
export class AuthEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(AuthActions.LOAD_DATA)
    .pipe(
      map((action: AuthActions.LoadData) => action.payload),
      switchMap(firebaseUser => this.userService.getById(firebaseUser.uid)
        .pipe(
          switchMap((res) => {
            const user = Object.assign({}, res, { email: firebaseUser.email, id: firebaseUser.uid });
            return this.organizationService.getById(user.organizationId)
              .pipe(
                map(organization => new AuthActions.LoadDataSuccess({
                  user,
                  organization: Object.assign({}, organization, { id: user.organizationId }),
                })),
              );
          })),
      ),
    );

  constructor(
    private actions: Actions,
    private userService: UserService,
    private organizationService: OrganizationService,
  ) {}
}
