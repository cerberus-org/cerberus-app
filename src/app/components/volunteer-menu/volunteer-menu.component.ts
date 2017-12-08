import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site } from '../../models/site';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.scss']
})
export class VolunteerMenuComponent implements OnInit {
  @Input() sites: Site[];
  @Output() onSiteClick = new EventEmitter<Site>();

  constructor() { }

  ngOnInit(): void { }

  click(site: Site): void {
    this.onSiteClick.emit(site);
  }
}
