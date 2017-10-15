import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers/index';
import * as CheckInActions from '../../actions/check-in.actions'
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private organizationService: OrganizationService) { }

  ngOnInit(): void {
    const organizationId = localStorage.getItem('organizationId');
    const siteId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new CheckInActions.LoadData({ organizationId, siteId }));
    this.organizationService.getByIdRx(organizationId);
  }
}
