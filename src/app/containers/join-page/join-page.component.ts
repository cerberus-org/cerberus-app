import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';
import * as AppActions from '../../actions/app.actions';
import * as JoinActions from '../../actions/join.actions';
import {HeaderOptions} from '../../models/header-options';
import {Organization} from '../../models/organization';
import {User} from '../../models/user';
import {State} from '../../reducers';
import {AuthService} from '../../services/auth.service';
import {ErrorService} from '../../services/error.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  private joinSubscription: Subscription;
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Cerberus',
    'group_work',
    null,
    false,
  );

  validUser: User;
  userFormTitle: string;
  organizations: Organization[];

  constructor(private authService: AuthService,
              private errorService: ErrorService,
              private store: Store<State>) {
    this.userFormTitle = 'Please enter your information.';
  }

  ngOnInit() {
    this.store.dispatch(new JoinActions.LoadData());
    this.joinSubscription = this.store.select('join')
      .subscribe(state => {
        this.organizations = state.organizations;
      });
    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  /**
   * Handles validUser events by setting validUser.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.validUser = user;
  }

  onJoinOrganization() {
    // this.authService.createUser(this.validUser);
  }
}
