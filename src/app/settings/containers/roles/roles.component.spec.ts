import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { getMemberRoles } from '../../../shared/helpers';
import { RolesTableRow } from '../../selectors/roles.selectors';
import { RolesComponent } from './roles.component';
import arrayContaining = jasmine.arrayContaining;

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let memberWithRoleOptions: RolesTableRow;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RolesComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showRemove', 'getRowColor', 'isEditable'],
        }),
      ],
      imports: [
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    memberWithRoleOptions = {
      ...createMockMembers()[0],
      roleOptions: getMemberRoles(),
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the firstName of a volunteer in the first table column', () => {
    expect(component.columnOptions[0].cell(memberWithRoleOptions))
      .toEqual(memberWithRoleOptions.firstName);
  });

  it('should display the lastName of a volunteer in the second table column', () => {
    expect(component.columnOptions[1].cell(memberWithRoleOptions))
      .toEqual(memberWithRoleOptions.lastName);
  });

  it('should display the role of a volunteer in the third table column', () => {
    expect(component.columnOptions[2].cell(memberWithRoleOptions))
      .toEqual(memberWithRoleOptions.role);
  });

  it('should include role selectOptions in the third table column', () => {
    expect(component.columnOptions[2].selectOptions(memberWithRoleOptions))
      .toEqual(arrayContaining(getMemberRoles()));
  });
});
