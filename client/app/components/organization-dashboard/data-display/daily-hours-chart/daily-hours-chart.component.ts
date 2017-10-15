import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { State } from '../../../../reducers/index';
import * as DataDisplayActions from '../../../../actions/data-display.actions';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.css']
})
export class DailyHoursChartComponent implements OnInit, OnDestroy {
  dataDisplaySubscription: Subscription;
  visitsSubscription: Subscription;
  data: { data: string[], label: string }[];
  labels: string[];
  options = { responsive: true, maintainAspectRatio: false };
  type = 'line';

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.data = [];
    this.labels = [];

    this.visitsSubscription = this.store.select('visits').subscribe(state =>
      this.store.dispatch(new DataDisplayActions.SetupLineChart(state.visits)));

    this.dataDisplaySubscription = this.store.select('dataDisplay').subscribe(state => {
      this.data = state.lineChartData;
      // This workaround updates the labels array while keeping its reference,
      // since Chart.js does not support immutable changes for labels
      this.labels.length = 0;
      Array.prototype.push.apply(this.labels, state.lineChartLabels);
    });
  }

  ngOnDestroy(): void {
    this.visitsSubscription.unsubscribe();
    this.dataDisplaySubscription.unsubscribe();
  }
}
