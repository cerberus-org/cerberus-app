import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input() options: string[];
  @Output() selectIndex = new EventEmitter<number>();
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.setForScreen();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.setForScreen();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  onClick(index: number): void {
    this.selectIndex.emit(index);
  }

  setForScreen(): void {
    if (!this.mobileQuery.matches) {
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
