import { DataSource } from '@angular/cdk/collections';
import { OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Visit } from '../../models/visit';

/**
 * Data source to provide what data should be rendered in the table. Note that the data source can retrieve its data in
 * any way. It is not the data source's responsibility to manage the underlying data. Instead, it only needs to take the
 * data and send the table exactly what should be rendered.
 */
export class VisitDataSource extends DataSource<any> implements OnDestroy {
  visitsSubscription: Subscription;
  visits: Visit[];
  error: string;

  constructor(private visits$: Observable<Visit[]>, private paginator: MatPaginator) {
    super();
    this.visitsSubscription = this.visits$
      .subscribe(visits => this.visits = visits);
  }

  ngOnDestroy(): void {
    this.visitsSubscription.unsubscribe();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   */
  connect(): Observable<any[]> {
    return Observable.merge(this.paginator.page, this.visits$).map(() => {
      return this.getPageData();
    });
  }

  getPageData(): Visit[] {
    const data = this.visits.slice();
    // Grab the page's slice of data based on the current page and items per page.
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  disconnect() {}
}
