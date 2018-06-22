import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { User } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';
import { RolesContainerState, selectRolesContainerState } from '../../store/selectors/roles.selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  state$: Observable<RolesContainerState> = this.store$.pipe(select(selectRolesContainerState));

  constructor(public store$: Store<RootState>) {}

  onUpdateUser(user: User) {
    this.store$.dispatch(new SettingsActions.UpdateRole(user));
  }

  onDeleteUser(user: User) {
    console.log('Not yet implemented');
  }

  get users$() {
    return this.state$.pipe(map(state => state.users));
  }
}
