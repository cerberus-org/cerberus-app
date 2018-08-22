import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';

import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { getMemberRoles } from '../../../shared/helpers';
import { MemberTableRow } from '../../models/member-table-row';
import { MemberSettingsComponent } from './member-settings.component';

describe('MemberSettingsComponent', () => {
  let component: MemberSettingsComponent;
  let fixture: ComponentFixture<MemberSettingsComponent>;
  let memberWithRoleOptions: MemberTableRow;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ...mockStoreModules,
      ],
      declarations: [
        MemberSettingsComponent,
        MockComponent({
          selector: 'app-data-table',
          inputs: ['columnOptions', 'data$', 'showEdit', 'showRemove', 'disableEdit', 'disableRemove'],
        }),
        MockComponent({ selector: 'app-settings-toolbar', inputs: ['title'] }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    memberWithRoleOptions = {
      member: createMockMembers()[0],
      user: null,
      roleOptions: getMemberRoles(),
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the role of a member in the second table column', () => {
    expect(component.columnOptions[1].cell(memberWithRoleOptions))
      .toEqual(memberWithRoleOptions.member.role);
  });
});
