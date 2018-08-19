import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
        MockComponent({ selector: 'app-team-settings' }),
        MockComponent({ selector: 'app-volunteers-settings' }),
        MockComponent({ selector: 'app-roles' }),
        MockComponent({ selector: 'app-visits-settings' }),
        MockComponent({ selector: 'app-reports' }),
        MockComponent({ selector: 'app-sites-settings' }),
      ],
      imports: [
        RouterTestingModule,
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
