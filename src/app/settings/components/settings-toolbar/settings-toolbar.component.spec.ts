import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule, MatToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsToolbarComponent } from './settings-toolbar.component';

describe('SettingsToolbarComponent', () => {
  let component: SettingsToolbarComponent;
  let fixture: ComponentFixture<SettingsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDividerModule,
        MatToolbarModule,
      ],
      declarations: [
        SettingsToolbarComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
