import { MediaMatcher } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SidenavOptions } from '../../models/sidenav-options';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input() options: SidenavOptions[];
  @Output() selectIndex = new EventEmitter<number>();
  mobileQuery: MediaQueryList;
  mode: string;

  private mobileQueryListener: () => void;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(() => this.setForScreen(this.mobileQuery.matches));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      if (changes['options'].currentValue) {
        this.setForScreen(this.mobileQuery.matches);
      } else {
        this.sidenav.close();
      }
      console.log('change!');
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  onClick(index: number): void {
    this.selectIndex.emit(index);
  }

  setForScreen(xs: boolean): void {
    if (xs) {
      this.mode = 'over';
      this.sidenav.disableClose = false;
      this.sidenav.close();
    } else {
      this.mode = 'side';
      this.sidenav.disableClose = true;
      this.sidenav.open();
    }
  }

  toggle(): void {
    this.sidenav.toggle();
  }
}
