import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as DataDisplayActions from '../../actions/data-display.actions'
import { AppState } from '../../reducers/index';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new DataDisplayActions.LoadData(
      getLocalStorageObjectProperty('organization', 'id')
    ));
  }
}
