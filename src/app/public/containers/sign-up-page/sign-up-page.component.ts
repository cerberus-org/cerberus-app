import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatTabGroup } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';
import { HeaderOptions, Organization } from '../../../shared/models';
import * as SignUpActions from '../../actions/sign-up.actions';
import { PublicState } from '../../reducers';
import { selectSignUpPageState, SignUpPageState } from '../../selectors/sign-up.selectors';

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
  state$: Observable<SignUpPageState> = this.store$.pipe(select(selectSignUpPageState));

  constructor(private store$: Store<PublicState>, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(this.headerOptions));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
  }

  onCheckJoinOrganization($event: MatCheckboxChange) {
    this.store$.dispatch(new SignUpActions.SetJoinExistingOrganization($event.checked));
    this.changeDetectorRef.detectChanges();
  }

  onValidOrganization(organization: Organization): void {
    this.store$.dispatch(new SignUpActions.SetValidOrganization(organization));
  }

  onValidUserFormChanges(userFormChanges: UserFormChanges): void {
    this.store$.dispatch(new SignUpActions.SetValidMemberAndUserInfo(userFormChanges));
  }

  onCheckTos($event: MatCheckboxChange) {
    this.store$.dispatch(new SignUpActions.SetTosChecked($event.checked));
  }

  onNext(step): void {
    this.store$.dispatch(new SignUpActions.NextStep(step));
    this.tabGroup.selectedIndex = step;
  }

  onSubmit(): void {
    this.store$.dispatch(new SignUpActions.Submit());
  }
}
