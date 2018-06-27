import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { User as FirebaseUser } from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationService } from '../../../data/services/organization.service';
import { UserService } from '../../../data/services/user.service';
import { User } from '../../../models';
import * as SessionActions from '../actions/session.actions';

@Injectable()
export class SessionEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(SessionActions.LOAD_DATA)
    .pipe(
      map((action: SessionActions.LoadData) => action.payload),
      switchMap((firebaseUser: FirebaseUser) => this.userService.getById(firebaseUser.uid)
        .pipe(
          switchMap((userData: User) => {
            const user = {
              ...userData,
              email: firebaseUser.email,
              id: firebaseUser.uid,
            };
            return this.organizationService.getById(user.organizationId)
              .pipe(
                map(organization => new SessionActions.LoadDataSuccess({
                  user,
                  organization: { ...organization, id: user.organizationId },
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
