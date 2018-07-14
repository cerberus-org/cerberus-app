import { MediaMatcher } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createMockSidenavOptions } from '../../../mock/objects/sidenav-options.mock';
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
    spyOn(component.selectOption, 'emit');
    const option = createMockSidenavOptions()[0];
    component.onClick(option);
    expect(component.selectOption.emit).toHaveBeenCalledWith(option);
  });

  it('should set the sidenav for small screens', () => {
    spyOn(component.sidenav, 'close');
    component.setForScreen(true);
    expect(component.mode).toEqual('over');
    expect(component.sidenav.disableClose).toBeFalsy();
    expect(component.sidenav.close).toHaveBeenCalled();
  });

  it('should set the sidenav for large screens', () => {
    spyOn(component.sidenav, 'open');
    component.setForScreen(false);
    expect(component.mode).toEqual('side');
    expect(component.sidenav.disableClose).toBeTruthy();
    expect(component.sidenav.open).toHaveBeenCalled();
  });

  it('should toggle the sidenav', () => {
    spyOn(component.sidenav, 'toggle');
    component.toggle();
    expect(component.sidenav.toggle).toHaveBeenCalled();
  });
});
