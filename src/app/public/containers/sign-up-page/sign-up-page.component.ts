import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatTabGroup } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LayoutActions from '../../../core/store/actions/layout.actions';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';
import { HeaderOptions, Organization } from '../../../shared/models';
import * as GettingStartedActions from '../../store/actions/sign-up.actions';
import { PublicState } from '../../store/reducers';
import { GettingStartedPageState, selectGettingStartedPageState } from '../../store/selectors/sign-up.selectors';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Sign Up',
    'wb_sunny',
    '/home',
    false,
  );
  @ViewChild('tabGroup') private tabGroup: MatTabGroup;
  userFormTitle: string = 'Create an account to access your organization.';
  organizationFormTitle: string = 'Tell us about your organization.';
  state$: Observable<GettingStartedPageState> = this.store$.pipe(select(selectGettingStartedPageState));

  constructor(private store$: Store<PublicState>, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(this.headerOptions));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
  }

  onCheckJoinOrganization($event: MatCheckboxChange) {
    this.store$.dispatch(new GettingStartedActions.SetJoinExistingOrganization($event.checked));
    this.changeDetectorRef.detectChanges();
  }

  onValidOrganization(organization: Organization): void {
    this.store$.dispatch(new GettingStartedActions.SetValidOrganization(organization));
  }

  onValidUserFormChanges(userFormChanges: UserFormChanges): void {
    this.store$.dispatch(new GettingStartedActions.SetValidMemberAndUserInfo(userFormChanges));
  }

  onCheckTos($event: MatCheckboxChange) {
    this.store$.dispatch(new GettingStartedActions.SetTosChecked($event.checked));
  }

  onNext(step): void {
    this.store$.dispatch(new GettingStartedActions.NextStep(step));
    this.tabGroup.selectedIndex = step;
  }

  onSubmit(): void {
    this.store$.dispatch(new GettingStartedActions.Submit());
  }
}
