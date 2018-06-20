import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { testOrganizations } from '../../../models';
import { reducers } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/settings.actions';
import { OrganizationSettingsComponent } from './organization-settings.component';

describe('OrganizationSettingsComponent', () => {
  let component: OrganizationSettingsComponent;
  let fixture: ComponentFixture<OrganizationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        OrganizationSettingsComponent,
        MockComponent({ selector: 'app-organization-form', inputs: ['initialOrganization'] }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle organizationChanges events by setting organizationChanges', () => {
    component.onValidOrganization(testOrganizations[0]);
    expect(component.organizationChanges).toEqual(testOrganizations[0]);
  });

  it('should handle updateOrganization events by dispatching SettingsActions.UpdateOrganization', () => {
    spyOn(component.store, 'dispatch');
    const organization = Object.assign({}, testOrganizations[0], { name: 'Edited' });
    component.onSubmitOrganization(organization);
    expect(component.store.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateOrganization(organization));
  });
});
