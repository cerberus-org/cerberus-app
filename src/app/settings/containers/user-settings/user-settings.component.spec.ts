import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
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
        MockComponent({ selector: 'app-user-form', inputs: ['initialMember', 'passwordRequired'] }),
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
    component.onValidChanges(createMockMembers()[0]);
    expect(component.edits).toEqual(createMockMembers()[0]);
  });

  it('should handle submitUser events by dispatching SettingsActions.SetUser', () => {
    spyOn(component.store$, 'dispatch');
    const user = { ...createMockMembers()[0], firstName: 'Edited' };
    component.onSubmit(user);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(user));
  });
});
