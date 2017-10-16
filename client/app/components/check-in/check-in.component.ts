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

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationService) { }

  ngOnInit(): void {
    const siteId = this.activatedRoute.snapshot.paramMap.get('id');
    const organizationId = localStorage.getItem('organizationId');
    this.store.dispatch(new CheckInActions.LoadData({ siteId, organizationId }));
    this.organizationService.getByIdRx(organizationId);
  }
}
