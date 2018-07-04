import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import { Visit } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';
import { selectVisitsPageState, VisitsPageState } from '../../store/selectors/visits.selectors';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit {

  state$: Observable<VisitsPageState>;

  constructor(public store$: Store<RootState>) { }

  ngOnInit() {
    this.state$ = this.store$.pipe(select(selectVisitsPageState));
  }

  onUpdateVisits(visits: Visit[]) {
    this.store$.dispatch(new SettingsActions.UpdateVisits(visits));
  }

  get formattedVisits$() {
    return this.state$.pipe(map(state => state.formattedVisits));
  }
}
