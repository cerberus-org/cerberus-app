import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers/index';
import * as DataDisplayActions from '../../actions/data-display.actions'

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  visits$: Observable<AppState['visits']>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new DataDisplayActions.LoadData(localStorage.getItem('organizationId')));
  }
}
