import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Member } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';
import { RolesContainerState, selectRolesContainerState } from '../../store/selectors/roles.selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  state$: Observable<RolesContainerState>;

  constructor(public store$: Store<RootState>) {}

  ngOnInit(): void {
    this.state$ = this.store$.pipe(select(selectRolesContainerState));
  }

  onUpdateUser(user: Member) {
    this.store$.dispatch(new SettingsActions.UpdateRole(user));
  }

  onDeleteUser($event) {
    // TODO: Implement me
  }

  get members$() {
    return this.state$.pipe(map(state => state.members));
  }
}
