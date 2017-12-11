import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Site } from '../../models/site';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.scss']
})
export class VolunteerMenuComponent {
  @Input() sites: Site[];
  @Output() siteClick = new EventEmitter<Site>();

  onClick(site: Site): void {
    this.siteClick.emit(site);
  }
}
