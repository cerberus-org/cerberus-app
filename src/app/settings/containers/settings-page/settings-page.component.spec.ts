import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsPageComponent,
        MockComponent({ selector: 'app-user-settings' }),
        MockComponent({ selector: 'app-organization-settings' }),
        MockComponent({ selector: 'app-volunteer-settings' }),
        MockComponent({ selector: 'app-roles' }),
        MockComponent({ selector: 'app-visits' }),
        MockComponent({ selector: 'app-reports' }),
      ],
      imports: [
        ...mockStoreModules,
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
