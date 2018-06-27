import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { User } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';
import { RolesPageState, selectRolesPageState } from '../../store/selectors/roles.selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  state$: Observable<RolesPageState>;

  constructor(public store$: Store<RootState>) {}

  ngOnInit(): void {
    this.state$ = this.store$.pipe(select(selectRolesPageState));
  }

  onUpdateUser(user: User) {
    this.store$.dispatch(new SettingsActions.UpdateRole(user));
  }

  onDeleteUser($event) {
    console.log('Not yet implemented', $event);
  }

  get users$() {
    return this.state$.pipe(map(state => state.users));
  }
}
