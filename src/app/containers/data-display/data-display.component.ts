import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';
import { Visit } from '../../models/visit';
import * as DataDisplayActions from '../../actions/data-display.actions'
import { State } from '../../reducers/index';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {
  visits$: Observable<Visit[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new DataDisplayActions.LoadData(
      getLocalStorageObjectProperty('organization', 'id')
    ));
    this.visits$ = this.store.select('dataDisplay').map(state => state.visits);
  }
}
