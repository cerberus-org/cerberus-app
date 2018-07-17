import { MediaMatcher } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { createMockHeaderOptions } from '../../../mock/objects/header-options.mock';
import { createMockSidenavOptions } from '../../../mock/objects/sidenav-options.mock';
import * as LayoutActions from '../../store/actions/layout.actions';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatSidenavModule,
        NoopAnimationsModule,
      ],
      declarations: [
        SidenavComponent,
      ],
      providers: [
        MediaMatcher,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a selectOption event on click', () => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    const option = createMockSidenavOptions()[0];
    component.onClick(option);
    expect(dispatch).toHaveBeenCalledWith(option.action);
  });

  it('should set the sidenav for small screens', () => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.setForScreen(true);
    expect(component.mode).toEqual('over');
    expect(component.sidenav.disableClose).toBeFalsy();
    expect(dispatch).toHaveBeenCalledWith(new LayoutActions.SetSidenavOpened(false));
  });

  it('should set the sidenav for large screens', () => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.setForScreen(false);
    expect(component.mode).toEqual('side');
    expect(component.sidenav.disableClose).toBeTruthy();
    expect(dispatch).toHaveBeenCalledWith(new LayoutActions.SetSidenavOpened(true));
  });
});
