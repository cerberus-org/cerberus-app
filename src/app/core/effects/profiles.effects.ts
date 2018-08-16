import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadProfiles, LoadProfilesByIds, ProfilesActionTypes } from '../actions/profiles.actions';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfilesEffects {

  constructor(
    private actions: Actions,
    private profileService: ProfileService,
  ) {}

  @Effect()
  loadProfiles$: Observable<Action> = this.actions.pipe(
    ofType<LoadProfiles>(ProfilesActionTypes.LoadProfiles),
    switchMap(() => this.profileService.getAllChanges()),
  );

  @Effect()
  loadProfilesByIds$: Observable<Action> = this.actions.pipe(
    ofType<LoadProfilesByIds>(ProfilesActionTypes.LoadProfilesByIds),
    map(action => action.payload.ids),
    switchMap(ids => this.profileService.getChangesByIds(ids)),
  );
}
