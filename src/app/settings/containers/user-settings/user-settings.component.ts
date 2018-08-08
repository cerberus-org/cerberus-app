import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';
import { UpdateUser } from '../../actions/settings.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { SettingsState } from '../../reducers';
import { getUserSettingsContainerState, UserSettingsContainerState } from '../../selectors/user-settings.selectors';

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
    this.state$ = this.store$.pipe(select(getUserSettingsContainerState));
  }

  /**
   * Handles validCredentials events by setting edits.
   * @param {UserFormChanges} changes - a changes object when valid, null when invalid
   */
  onValidChanges(changes: UserFormChanges) {
    this.edits = changes;
  }

  /**
   * Handles submission of member form by dispatching UpdateUser.
   */
  onSubmit(edits: UserFormChanges) {
    this.store$.dispatch(new UpdateUser(edits));
  }
}
