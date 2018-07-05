import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockCredentials } from '../../../mock/objects/credentials.mock';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import * as SettingsActions from '../../store/actions/settings.actions';
import { UserSettingsComponent } from './user-settings.component';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserSettingsComponent,
        MockComponent({ selector: 'app-user-form', inputs: ['initialEmail', 'initialMember', 'passwordRequired'] }),
      ],
      imports: [
        ...mockStoreModules,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle edits events by setting edits', () => {
    const edits = {
      member: createMockMembers()[0],
      credentials: createMockCredentials()[0],
    };
    component.onValidChanges(edits);
    expect(component.edits).toEqual(edits);
  });

  it('should handle submitUser events by dispatching SettingsActions.SetMemberAndUserInfo', () => {
    spyOn(component.store$, 'dispatch');
    const edits = {
      member: createMockMembers()[0],
      credentials: createMockCredentials()[0],
    };
    component.onSubmit(edits);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(edits));
  });
});
