import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import * as SettingsActions from '../../actions/settings.actions';
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

  it('should handle edits events by setting edits', async(() => {
    const edits = {
      member: createMockMembers()[0],
      credentials: createMockCredentials()[0],
    };
    component.onValidChanges(edits);
    expect(component.edits).toEqual(edits);
  }));

  it('should handle submitUser events by dispatching SettingsActions.SetMemberAndUserInfo', async(() => {
    spyOn(component.store$, 'dispatch');
    const edits = {
      member: createMockMembers()[0],
      credentials: createMockCredentials()[0],
    };
    component.onSubmit(edits);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(edits));
  }));
});
