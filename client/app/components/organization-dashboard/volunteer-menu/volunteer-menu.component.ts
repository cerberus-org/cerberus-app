import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../reducers/index';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.css']
})
export class VolunteerMenuComponent implements OnInit {

  sites$: Observable<AppState['sites']>;
  error: string;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.sites$ = this.store.select('sites');
  }

  onClick(site): void {
    this.router.navigate(['/checkin', site._id]);
  }
}
