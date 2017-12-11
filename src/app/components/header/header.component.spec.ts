import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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

  it('should emit a buttonClick event on clicking back', () => {
    spyOn(component.buttonClick, 'emit');
    component.back();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('back');
  });

  it('should emit a buttonClick event on clicking settings', () => {
    spyOn(component.buttonClick, 'emit');
    component.settings();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('settings');
  });

  it('should emit a buttonClick event on clicking log out', () => {
    spyOn(component.buttonClick, 'emit');
    component.logOut();
    expect(component.buttonClick.emit).toHaveBeenCalledWith('logOut');
  });
});
