import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { createMockHeaderOptions } from '../../../../mocks/objects/header-options.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { SignOut } from '../../../auth/actions/auth.actions';
import { ToggleSidenavOpened } from '../../actions/layout.actions';
import { Back } from '../../actions/router.actions';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      imports: [
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should select the header state', async(() => {
    component.headerState$.subscribe((value) => {
      expect(value).toEqual({
        ...createMockHeaderOptions()[0],
        showLogOut: true,
        showToggleSidenav: true,
      });
    });
  }));

  it('should handle clicks to the toggle sidenav button by dispatching ToggleSidenavOpened', async(() => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.headerState$.subscribe(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const toggleSidenavButton = fixture.debugElement.query(By.css('#toggle-sidenav-button'));
        toggleSidenavButton.triggerEventHandler('click', {});
        expect(dispatch).toHaveBeenCalledWith(new ToggleSidenavOpened());
      });
    });
  }));

  it('should handle clicks to the back button by dispatching Back', async(() => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.headerState$.subscribe(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const toggleSidenavButton = fixture.debugElement.query(By.css('#back-button'));
        toggleSidenavButton.triggerEventHandler('click', {});
        expect(dispatch).toHaveBeenCalledWith(new Back());
      });
    });
  }));

  it('should handle clicks to the log out button by dispatching SignOut', async(() => {
    const dispatch = spyOn(TestBed.get(Store), 'dispatch');
    component.headerState$.subscribe(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const toggleSidenavButton = fixture.debugElement.query(By.css('#log-out-button'));
        toggleSidenavButton.triggerEventHandler('click', {});
        expect(dispatch).toHaveBeenCalledWith(new SignOut());
      });
    });
  }));
});
