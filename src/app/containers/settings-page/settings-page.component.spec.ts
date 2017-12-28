import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { MockComponent } from 'ng2-mock-component';
import { testOrganizations } from '../../models/organization';
import { testUsers } from '../../models/user';
import { reducers } from '../../reducers';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsPageComponent,
        MockComponent({ selector: 'app-user-form' }),
        MockComponent({ selector: 'app-organization-form' }),
      ],
      imports: [
        StoreModule.forRoot(reducers)
      ]
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

  it('should set user', () => {
    component.setUser(testUsers[0]);
    expect(component.validUser).toBe(testUsers[0]);
  })

  it('should set organization', () => {
    component.setOrganization(testOrganizations[0]);
    expect(component.validOrganization).toBe(testOrganizations[0]);
  })
});
