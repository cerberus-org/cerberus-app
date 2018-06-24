import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { rootReducers } from '../../../root/store/reducers';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(rootReducers),
      ],
      declarations: [
        SettingsPageComponent,
        MockComponent({ selector: 'app-user-settings' }),
        MockComponent({ selector: 'app-organization-settings' }),
        MockComponent({ selector: 'app-volunteer-settings' }),
        MockComponent({ selector: 'app-roles' }),
        MockComponent({ selector: 'app-reports' }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
