import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { createMockUsers } from '../../../mock/objects/user.mock';
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
        MockComponent({ selector: 'app-user-form', inputs: ['initialUser', 'passwordRequired'] }),
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

  it('should handle userEdits events by setting userEdits', () => {
    component.onValidUser(createMockUsers()[0]);
    expect(component.userEdits).toEqual(createMockUsers()[0]);
  });

  it('should handle submitUser events by dispatching SettingsActions.UpdateUser', () => {
    spyOn(component.store$, 'dispatch');
    const user = { ...createMockUsers()[0], firstName: 'Edited' };
    component.onSubmitUser(user);
    expect(component.store$.dispatch)
      .toHaveBeenCalledWith(new SettingsActions.UpdateUser(user));
  });
});
