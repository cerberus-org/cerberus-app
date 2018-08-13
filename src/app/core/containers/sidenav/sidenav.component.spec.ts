import { MediaMatcher } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { createMockSidenavOptions } from '../../../../mocks/objects/sidenav-options.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { SetSidenavOpened } from '../../actions/layout.actions';
import { SidenavComponent } from './sidenav.component';

class MockMediaMatcher {
  matchMedia = () => ({
    addListener: () => {},
    removeListener: () => {},
    matches: () => false,
  })
}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatSidenavModule,
        NoopAnimationsModule,
        ...mockStoreModules,
      ],
      declarations: [
        SidenavComponent,
      ],
      providers: [
        {
          provide: MediaMatcher,
          useClass: MockMediaMatcher,
        },
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

  it('should select the sidenav state', async(() => {
    component.sidenavState$.subscribe((value) => {
      expect(value.opened).toEqual(jasmine.any(Boolean));
      expect(value.options).toEqual(createMockSidenavOptions());
    });
  }));

  it('should handle clicks to a sidenav list item by dispatching the action property of the option', async(() => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    const options = createMockSidenavOptions();
    component.sidenavState$.subscribe(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const items = fixture.debugElement.query(By.css('mat-nav-list')).children;
        items[0].triggerEventHandler('click', {});
        items[1].triggerEventHandler('click', {});
        expect(dispatch).toHaveBeenCalledWith(options[0].action);
        expect(dispatch).toHaveBeenCalledWith(options[1].action);
      });
    });
  }));

  it('should set the sidenav for small screens', () => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.setForScreen(true);
    expect(component.mode).toEqual('over');
    expect(component.sidenav.disableClose).toBeFalsy();
    expect(dispatch).toHaveBeenCalledWith(new SetSidenavOpened({ sidenavOpened: false }));
  });

  it('should set the sidenav for large screens', () => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.setForScreen(false);
    expect(component.mode).toEqual('side');
    expect(component.sidenav.disableClose).toBeTruthy();
    expect(dispatch).toHaveBeenCalledWith(new SetSidenavOpened({ sidenavOpened: true }));
  });
});
