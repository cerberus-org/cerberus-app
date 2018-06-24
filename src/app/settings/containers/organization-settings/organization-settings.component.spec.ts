import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';
import { authReducers } from '../../../auth/store/reducers';
import { getMockOrganizations } from '../../../mock/objects/organization.mock';
import * as SettingsActions from '../../store/actions/settings.actions';
import { OrganizationSettingsComponent } from './organization-settings.component';

describe('OrganizationSettingsComponent', () => {
  let component: OrganizationSettingsComponent;
  let fixture: ComponentFixture<OrganizationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganizationSettingsComponent,
        MockComponent({ selector: 'app-organization-form', inputs: ['initialOrganization'] }),
      ],
      imports: [
        StoreModule.forFeature('auth', authReducers),
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

  it('should handle organizationEdits events by setting organizationEdits', () => {
    component.onValidOrganization(getMockOrganizations()[0]);
    expect(component.organizationEdits).toEqual(getMockOrganizations()[0]);
  });

  it('should handle updateOrganization events by dispatching SettingsActions.UpdateOrganization', () => {
    spyOn(component.store$, 'dispatch');
    const organization = { ...getMockOrganizations()[0], name: 'Edited' };
    component.onSubmitOrganization(organization);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateOrganization(organization));
  });
});
