import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatToolbarModule } from '@angular/material';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule
      ],
      declarations: [
        HeaderComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a buttonClick event on clicking sidenavToggle', () => {
    spyOn(component.buttonClick, 'emit');
    component.onSidenavToggle();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('sidenav_toggle');
  });

  it('should emit a buttonClick event on clicking back', () => {
    spyOn(component.buttonClick, 'emit');
    component.onBack();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('back');
  });

  it('should emit a buttonClick event on clicking settings', () => {
    spyOn(component.buttonClick, 'emit');
    component.onSettings();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('settings');
  });

  it('should emit a buttonClick event on clicking log out', () => {
    spyOn(component.buttonClick, 'emit');
    component.onLogOut();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('logOut');
  });
});
