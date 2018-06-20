import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { canSelectRole, getRoleOptions, isLastOwner } from '../../../functions';
import { ColumnOptions, User } from '../../../models';
import { State } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/settings.actions';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  private authSubscription: Subscription;
  private modelSubscription: Subscription;
  users: User[];
  users$: Observable<User[]>;
  currentUser: User;
  currentUserFromModel: User; // Used for user table
  userTableOptions: ColumnOptions[] = [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: User) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: User) => row.lastName,
    ),
    new ColumnOptions(
      'role',
      'Role',
      (row: User) => row.role,
      (row: User) => (
        canSelectRole(this.currentUserFromModel, row) && !isLastOwner(row, this.users)
          ? getRoleOptions(this.currentUserFromModel, row)
          : null
      ),
    ),
  ];

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        this.currentUser = state.user;
      });
    const model$ = this.store.select('model');
    this.users$ = model$.pipe(map(state => state.users));
    this.modelSubscription = model$
      .subscribe((state) => {
        this.currentUserFromModel = state.users
          .find(user => user.id === this.currentUser.id);
        this.users = state.users;
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }

  onUpdateUser(user: User) {
    this.store.dispatch(
      user.id === this.currentUser.id
        ? new SettingsActions.UpdateUser(user)
        : new SettingsActions.UpdateRole(user),
    );
  }

  onDeleteUser(user: User) {
    console.log('Not yet implemented');
  }
}
