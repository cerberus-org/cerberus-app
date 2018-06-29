import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';
import * as SettingsActions from '../../store/actions/settings.actions';
import { SettingsState } from '../../store/reducers';
import {
  selectUserSettingsContainerState,
  UserSettingsContainerState,
} from '../../store/selectors/user-settings.selectors';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  userFormTitle = 'Update your user info.';
  edits: UserFormChanges;
  state$: Observable<UserSettingsContainerState>;

  constructor(public store$: Store<SettingsState>) {}

  ngOnInit(): void {
    this.state$ = this.store$.pipe(select(selectUserSettingsContainerState));
  }

  /**
   * Handles validChanges events by setting edits.
   * @param {UserFormChanges} changes - a changes object when valid, null when invalid
   */
  onValidChanges(changes: UserFormChanges) {
    this.edits = changes;
  }

  /**
   * Handles submission of member form by dispatching an SetMemberAndUserInfo action.
   */
  onSubmit(edits: UserFormChanges) {
    this.store$.dispatch(new SettingsActions.UpdateUser(edits));
  }
}
