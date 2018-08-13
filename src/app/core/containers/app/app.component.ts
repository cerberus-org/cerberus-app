import { Component, ViewChild } from '@angular/core';
import { AppUpdateService } from '../../services/app-update.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;

  constructor(
    private appUpdateService: AppUpdateService,
  ) {}
}
