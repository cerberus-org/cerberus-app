import { MediaMatcher } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SidenavOptions } from '../../models';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnChanges, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input() sidenavOptions: SidenavOptions[];
  @Output() selectIndex = new EventEmitter<number>();
  mobileQuery: MediaQueryList;
  mode: string;

  private mobileQueryListener: () => void;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(() => this.setForScreen(this.mobileQuery.matches));
  }

  /**
   * Sets the sidenav on sidenavOptions changes.
   * @param changes - contains sidenavOptions changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sidenavOptions']) {
      if (changes['sidenavOptions'].currentValue) {
        this.setForScreen(this.mobileQuery.matches);
      } else {
        this.sidenav.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  /**
   * Handles click events from an option by emitting the selectIndex event.
   * @param index - the selected index.
   */
  onClick(index: number): void {
    this.selectIndex.emit(index);
  }

  /**
   * Sets the sidenav for xs screen size or larger.
   * @param xs - true if xs screen size
   */
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

  /**
   * Toggles the sidenav.
   */
  toggle(): void {
    this.sidenav.toggle();
  }
}
