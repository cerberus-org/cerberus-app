import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppUpdateService } from '../../services/app-update.service';
import * as ModelActions from '../../store/actions/model.actions';
import { AppState } from '../../store/reducers';
import { selectModelLoadedState } from '../../store/selectors/model.selectors';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;
  modelIsLoaded$: Observable<boolean>;
  isLoggedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private appUpdateService: AppUpdateService,
    private store$: Store<AppState>,
  ) {}

  ngOnInit(): void {
    // Check if user is logged in to determine if loader should be displayed
    this.afAuth.auth.onAuthStateChanged(user => this.handleAuthStateChanged(user));
    this.modelIsLoaded$ = this.store$.pipe(
      delay(500), // Add delay to hide sidenav animation
      select(selectModelLoadedState),
    );
    // Load all organizations
    this.store$.dispatch(new ModelActions.LoadOrganizations());
  }

  handleAuthStateChanged(user: User): void {
    this.isLoggedIn = !!user;
  }
}
