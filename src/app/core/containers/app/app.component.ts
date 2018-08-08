import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { AppUpdateService } from '../../services/app-update.service';
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
  ) {}

  ngOnInit(): void {
    // Check if user is logged in to determine if loader should be displayed
    this.afAuth.auth.onAuthStateChanged(user => this.handleAuthStateChanged(user));
  }

  handleAuthStateChanged(user: User): void {
    this.isLoggedIn = !!user;
  }
}
