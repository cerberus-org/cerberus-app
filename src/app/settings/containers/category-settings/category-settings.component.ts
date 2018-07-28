import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionReducerState } from '../../../auth/reducers/session.reducer';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {

  constructor(public store$: Store<SessionReducerState>) {}

  ngOnInit(): void {
  }
}
