import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { State } from '../../../../reducers/index';
import { Store } from '@ngrx/store';
import * as DataDisplayActions from '../../../../actions/data-display.actions';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.css']
})
export class DailyHoursChartComponent implements OnInit, OnDestroy {
  @Input() visits$: Observable<State['visits']>;
  dataDisplay$: Observable<State['dataDisplay']>;
  visitsSubscription: Subscription;
  lineChartData: any[];
  lineChartLabels: string[];
  lineChartOptions = { responsive: true, maintainAspectRatio: false };
  lineChartType = 'line';
  error: string;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.lineChartLabels = [];
    this.lineChartData = [];
    this.visitsSubscription = this.subscribeToVisits();
    this.dataDisplay$ = this.store.select('dataDisplay');
  }

  ngOnDestroy(): void {
    this.visitsSubscription.unsubscribe();
  }

  subscribeToVisits(): Subscription {
    return this.visits$.subscribe(state => {
      this.store.dispatch(new DataDisplayActions.SetupLineChart({
        visits: state.visits,
        latest: null,
        count: null }));
    }, error => this.error = <any>error);
  }
}
