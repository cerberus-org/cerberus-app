import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = query => {
      changeDetectorRef.detectChanges();
      this.setForScreen(query);
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.setForScreen(this.mobileQuery);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  setForScreen(query): void {
    if (!query.matches) {
      this.sidenav.disableClose = true;
      this.sidenav.open();
    } else {
      this.sidenav.disableClose = false;
      this.sidenav.close();
    }
  }

  toggle(): void {
    this.sidenav.toggle();
  }
}
