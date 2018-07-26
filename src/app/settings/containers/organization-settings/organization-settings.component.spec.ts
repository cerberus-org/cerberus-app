import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockOrganizations } from '../../../../mocks/objects/organization.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
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
        ...mockStoreModules,
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
    component.onValidOrganization(createMockOrganizations()[0]);
    expect(component.organizationEdits).toEqual(createMockOrganizations()[0]);
  });

  it('should handle updateOrganization events by dispatching SettingsActions.SetOrganization', () => {
    spyOn(component.store$, 'dispatch');
    const organization = { ...createMockOrganizations()[0], name: 'Edited' };
    component.onSubmitOrganization(organization);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateOrganization(organization));
  });
});
