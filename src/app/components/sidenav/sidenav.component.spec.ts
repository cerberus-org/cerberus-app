import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent
      ],
      imports: [
        MatListModule,
        MatSidenavModule,
        NoopAnimationsModule
      ],
      providers: [
        MediaMatcher
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
