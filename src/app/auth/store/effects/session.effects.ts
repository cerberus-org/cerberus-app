import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationService } from '../../../data/services/organization.service';
import { UserService } from '../../../data/services/user.service';
import * as SessionActions from '../actions/session.actions';

@Injectable()
export class SessionEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(SessionActions.LOAD_DATA)
    .pipe(
      map((action: SessionActions.LoadData) => action.payload),
      switchMap(firebaseUser => this.userService.getById(firebaseUser.uid)
        .pipe(
          switchMap((res) => {
            const user = Object.assign({}, res, { email: firebaseUser.email, id: firebaseUser.uid });
            return this.organizationService.getById(user.organizationId)
              .pipe(
                map(organization => new SessionActions.LoadDataSuccess({
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
